const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const cors = require('cors');
const multer = require('multer');
const socketIO = require('socket.io')
const http = require('http');
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
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server)

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

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
      console.log('Received message:', data);
      // Broadcast the message to all connected clients
      // io.emit('message', data);
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});

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
    const result = await db.collection(COLLECTION_NAME).insertOne({ ...body, password: encrypted, budget: [], stocks: [], chat: [], reviews: [], monthlyAdvisingFee: 0 });
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
            userId: currentUser._id,
            userName: currentUser.name
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
  const token = req.headers["authorization"]?.split(" ")[1];
  const key = PRIVATE_KEY;

  // console.log("token is: ", token);
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
  if (req.body.budget.limit && totalExpense > req.body.budget.limit) {
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

app.get("/getAdvisorInfo/client/:clientID", async (req, res) => {
  try {
    const ret = await db.collection(COLLECTION_NAME).find({ role: "advisor" }).toArray();
    const reservationStatus = await db.collection("reservation").find({ userId: new ObjectId(req.params.clientID) }).toArray();
    // console.log("ers Status", reservationStatus)
    const reserveList = [];
    for (const reservation of reservationStatus) {
      const index = ret.findIndex(item => item._id.equals(reservation.advisorId)); // Finding index using findIndex
      if (index !== -1) {
        ret[index]['requests'] = reservation.requests;
      }
    }
    for (const usr of ret) {
      reserveList.push({ _id: usr._id, name: usr.name, address: usr.address, email: usr.email, requests: usr.requests, profileImg: usr.profileImg });
    }

    // console.log("reservationList", ret);
    res.status(200).send({ success: true, data: reserveList });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" });
  }
})

app.get("/getApprovedClient/advisor/:advisorID", async (req, res) => {
  try {

    // const ret = await db.collection(COLLECTION_NAME).find({ role: "advisor" }).toArray();
    const retClient = await db.collection("reservation").find({ advisorId: new ObjectId(req.params.advisorID), requests: "approved" }).toArray();

    // console.log("client Info", ret);
    const clientList = []

    for (const client of retClient){
      const clientInfo = await db.collection(COLLECTION_NAME).findOne(client.userId);
      clientList.push({id: clientInfo._id, name: clientInfo.name, address: clientInfo.address, email: clientInfo.address, profileImg: clientInfo.profileImg})
    }
    // const reserveList = [];
    // for (const reservation of reservationStatus) {
    //   const index = ret.findIndex(item => item._id.equals(reservation.advisorId)); // Finding index using findIndex
    //   if (index !== -1) {
    //     ret[index]['requests'] = reservation.requests;
    //   }
    // }
    // for (const usr of ret) {
    //   reserveList.push({ _id: usr._id, name: usr.name, address: usr.address, email: usr.email, requests: usr.requests, profileImg: usr.profileImg });
    // }
    res.status(200).send({ success: true, data: clientList });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" });
  }
})

const Status = {
  PENDING: 'pending',
  APPROVED: 'approved',
  DECLINE: 'decline'
}

app.post("/reservation/user/:userID/advisor/:advisorID", async (req, res) => {

  try {
    const ret = await db.collection("reservation").insertOne({ userId: new ObjectId(req.params.userID), advisorId: new ObjectId(req.params.advisorID), requests: Status.PENDING, validTime: {}, payment: {} });
    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" })
  }
})

app.post("/message/sender/:senderID/receiver/:recieverID", async (req, res) => {
  try {
    console.log("userId", req.params.senderID, "advisorId", req.params.recieverID)
    const ret = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(req.params.senderID) },
      { $push: { chat: { sendTo: new ObjectId(req.params.recieverID), msg: req.body.message, image: "test.png", dateTime: new Date() } } });
    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" })
  }
})

app.get("/message/sender/:senderID/receiver/:recieverID", async (req, res) => {
  try {
    const retSender = await db.collection(COLLECTION_NAME).find({ _id: new ObjectId(req.params.senderID)}).toArray();
    const msgSender = retSender[0].chat.filter(msgs => msgs.sendTo.toString() === req.params.recieverID);
    console.log("msgSender is: ", msgSender)

    const retReciever = await db.collection(COLLECTION_NAME).find({ _id: new ObjectId(req.params.recieverID)}).toArray();
    const msgReceiver = retReciever[0].chat.filter(msgs => msgs.sendTo.toString() === req.params.senderID);
    console.log("msgReceiver is: ", msgReceiver)

    const ret = [...msgSender, ...msgReceiver];
    console.log("eretrn is", ret) 

    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" }) 
  }
})

app.get("/getClientInfo/:advisorID", async (req, res) => {
  try {
    const ret = await db.collection("reservation").find({ requests: "pending", advisorId: new ObjectId(req.params.advisorID) }).toArray();
    
    let userList = [];
    for (const usr of ret) {
      const retUsr = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(usr.userId) });
      
      userList.push({ id: retUsr._id, name: retUsr.name, address: retUsr.address, occupation: retUsr.occupation, profileImg: retUsr.profileImg });
    }
    
    res.status(200).send({ success: true, data: userList });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" });
  }
})

app.put("/rejectClient/advisor/:advisorID/client/:clientID", async (req, res) => {

  try {
    const ret = await db.collection("reservation").updateOne(
      { userId: new ObjectId(req.params.clientID), advisorId: new ObjectId(req.params.advisorID) },
      { $set: { requests: Status.DECLINE } }
    );
    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" })
  }
})

app.put("/acceptClient/advisor/:advisorID/client/:clientID", async (req, res) => {

  try {
    const ret = await db.collection("reservation").updateOne(
      { userId: new ObjectId(req.params.clientID), advisorId: new ObjectId(req.params.advisorID), requests: Status.PENDING, validTime: {}, payment: {} },
      { $set: { requests: Status.APPROVED } }
    );
    res.status(200).send({ success: true, data: ret });
  } catch (error) {
    res.status(400).send({ success: false, error: "db error" })
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
  console.error(err.stack);
  res.status(500).send({ success: false, error: 'Internal Server Error' });
});


const PORT = 5001;
server.listen(PORT, () => console.log(`listening to ${PORT}...`));