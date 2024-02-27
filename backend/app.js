const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const cors = require('cors');
const multer = require('multer');
const COLLECTION_NAME = "personalFinance"
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const path = require("path");
const PRIVATE_KEY = "finance";
let db = null;
const { Client } = require('square');
const { randomUUID } = require('crypto');
const nodemailer = require("nodemailer")
// import { Client } from 'square';
// import { randomUUID } from 'crypto';



BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken: "EAAAEGJV2D6hdYb5laYRRgZKa7cUhe7HgqzC0zyuhUVmX7-hDymlGmgio_o35KuF",
  environment: 'sandbox'
})

require('dotenv').config();

//initialization
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

async function connectDB() {
  try {
    let uri = process.env.DB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("Finance");
    console.log('DB connected');
  } catch (err) {
    console.log(err);
  }
}

connectDB();

//check for the extension of an image
const getExtension = file => {
  if (file.mimetype === "image/jpeg") {
    ext = ".jpg"
  } else {
    ext = ".png"
  }
  return ext
}

//initialize multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/public/images'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + getExtension(file))
  }
})
const upload = multer({ storage })

//email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "xtasy09@gmail.com",
    pass: "jrwh fpqs vjns shwi"
  }
});



//signup
app.post('/signup', upload.single('profileImg'), async (req, res) => {

  try {
    const body = req.body;
    body.profileImg = req.file.filename;

    const newUser = await db.collection(COLLECTION_NAME).find({ email: body.email }).toArray();

    if (newUser.length > 0) {
      return res
        .status(409)
        .send({ success: false, error: "please use another email" });
    }

    const encrypted = await bcrypt.hash(body.password, 10);
    const result = await db.collection(COLLECTION_NAME).insertOne({ ...body, password: encrypted, budget: [], stocks: [] });
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, err: "DB error" })
  }
})

app.post("/signin", async (req, res) => {
  try {
    const body = req.body;

    const currentUser = await db.collection(COLLECTION_NAME).findOne({ email: body.email });
    if (currentUser) {
      const correctPwd = await bcrypt.compare(body.password, currentUser.password);
      if (correctPwd) {
        const token = jwt.sign({ email: currentUser.email }, PRIVATE_KEY);

        return res.send({
          success: true,
          data: {
            token,
            email: currentUser.email,
            role: currentUser.role,
            userId: currentUser._id
          }
        })
      } else {
        return res.send({ success: false, error: "wrong password" });
      }
    } else {
      return res.send({ success: false, error: "wrong password" });
    }
  }
  catch (err) {
    res.send({ success: false, error: "DB error" })
  }
})

function auth(req, res, next) {
  console.log("headres", req.headers)
  const token = req.headers["authorization"]?.split(" ")[1];
  const key = PRIVATE_KEY;

  console.log("token is: ", token);
  if (!token) {
    return res.status(401).send({ success: false, error: "Please provide token" });
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, error: err.message });
    }
    // req.currentUser = decoded;
    next();
  })
}
app.use(auth);

app.post("/budget/:email", async (req, res) => {

  const totalExpense = (parseInt(req.body.budget.rent.actual) || 0) + (parseInt(req.body.budget.groceries.actual) || 0);
  if(req.body.budget.limit && totalExpense > req.body.budget.limit ){
    const mailOptions = {
      from: "xtasy09@gmail.com",
      to: "raj2evthapa@gmail.com",
      subject: "Expenses Exceeded",
      html: "Your expenses has exceeded your budget limit"
    };
    transporter.sendMail(mailOptions)
  }
  

  try {
    const check = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email, "budget.date": req.body.date });
    let ret = null;
    if (check) {
      ret = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $set: { "budget.$[obj].budget": req.body.budget } },
        { arrayFilters: [{ "obj.date": req.body.date }] });
    } else {
      ret = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $push: { budget: req.body } });
    }
    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" })
  }
})

app.get("/getBudget/:date/:email", async (req, res) => {
  try {
    const ret = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email });
    const check = ret.budget.filter((bud) => bud.date === req.params.date);
    if (check) {
      res.status(200).send({ success: true, data: check[0] })
    } else {
      res.status(200).send({ success: true, data: null })
    }

  } catch (error) {
    res.status(400).send({ success: false, error: "db error" })
  }
})

app.get("/userInfo/:email", async (req, res) => {
  try {
    const ret = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email });
    console.log("email is", req.params.email)
    // const profileImgUrl = `/images/${ret.profileImg}`
    res.status(200).send({ success: true, data: { name: ret.name, address: ret.address, role: ret.role, occupation: ret.occupation, email: ret.email, profileImg: ret.profileImg } });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" })
  }
})

app.get("/getAdvisorInfo", async (req, res) => {
  try {
    const ret = await db.collection(COLLECTION_NAME).find({ role: "advisor" }).toArray();
    console.log("getAdvisor", ret)
    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" });
  }
})

const Status = {
  PENDING: 'pending',
  APPROVED: 'approved',
  DECLINE: 'decline'
}

app.post("/reservation/user/:userID/advisor/:advisorID", async(req, res) => {

  try{
    const ret = await db.collection("reservation").insertOne({ userId: new ObjectId(req.params.userID), advisorId: new ObjectId(req.params.advisorID), requests: Status.PENDING, validTime:{}, payment:{}});
    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" })
  }
})

app.get("/getClientInfo/:advisorID", async (req, res) => {
  try {
    const ret = await db.collection("reservation").find({},{ requests: "pending", advisorId: new ObjectId(req.params.advisorID) }).toArray();
    console.log("getclientinfo", ret)
    let userList = [];
    for(const usr of ret){
      const retUsr = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(usr.userId) });
      console.log("retUsr", retUsr);
      userList.push(retUsr);
    }
    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" });
  }
})

// export default async function handler(req, res) {
//   if ( req.method === 'POST' ) {
//     const { result } = await paymentsApi.createPayment({
//       idempotencyKey: randomUUID(),
//       sourceId: req.body.sourceId,
//       amountMoney: {
//         currency: 'USD',
//         amount: 100
//       }
//     })
//     console.log(result);
//     res.status(200).json(result);
//   } else {
//     res.status(500).send();
//   }
// }

app.post("/api/pay", async (req, res) => {
  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: 'USD',
        amount: 100
      }
    })
    console.log(result);

    res.status(200).json({ success: true, message: "Payment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Payment failed" });
  }
});

app.use((err, req, res, next) => {
  console.log(err.message);
})

const PORT = 5001;
app.listen(PORT, () => console.log(`listening to ${PORT}...`));