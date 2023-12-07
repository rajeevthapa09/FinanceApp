const {MongoClient} = require('mongodb');
const express = require("express");
const cors = require('cors');
const COLLECTION_NAME = "personalFinance"
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const PRIVATE_KEY = "finance";
let db = null;

require('dotenv').config();

//initialization
const app = express();

//middleware
app.use(cors());
app.use(express.json());

async function connectDB(){ 
  try{ 
    let uri = process.env.DB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("Finance");
    console.log('DB connected');
  }catch(err){
    console.log(err);
  }
}

connectDB();

//signup
app.post('/signup', async(req, res) => {
  try{
    const body = req.body;
    
    const newUser = await db.collection(COLLECTION_NAME).find({ email: body.email }).toArray();
    if (newUser.length > 0) {
      return res
        .status(409)
        .send({ success: false, error: "please use another email" });
    }

    const encrypted = await bcrypt.hash(body.password, 10);
    console.log("adf", {...body, password: encrypted})

    const result = await db.collection(COLLECTION_NAME).insertOne({...body, password: encrypted, stocks:[]});

    res.status(200).send({success: true, data: result});
  }catch(error){
    res.status(500).send({success: false, err: "DB error"})
  }
})

// app.post("/addStocks", async (req, res) => {
//   try{
//     console.log("date" , new Date());
//     const body = req.body;
//     console.log("body", body)
//     const addStocks = await db.collection("stocks").insertOne({...body, date: new Date()});
//     res.status(200).send({success:true, data: addStocks});
//   }catch(error){
//     console.log(error);
//   }
// })

// app.post("/addTransaction", async(req, res) => {
//   try{
//     const body = req.body;
//     const addTransaction = await db.collection(COLLECTION_NAME).insertOne({"email": "test@test.edu"},{$push: {stocks: {...body, date: new Date()}}})
//     res.status(200).send({success: true, data:addTransaction});
//   }catch(error){
//     console.log(error);
//   }
// })

app.post("/signin", async (req, res) => {
  try{
    const body = req.body;

    const currentUser = await db.collection(COLLECTION_NAME).findOne({email: body.email});
    if (currentUser) {
      const correctPwd = await bcrypt.compare(body.password, currentUser.password);
      if (correctPwd){
        const token = jwt.sign({ userID: currentUser._id, email: currentUser.email }, PRIVATE_KEY);

        return res.send({
          success: true,
          data: {
            token,
             email: currentUser.email,
             role:currentUser.role
          }
        })
      } else {
        return res.send({ success:false, error: "wrong password"});
      }
    } else {
      return res.send({success: false, error: "wrong password"});
    }
  }
  catch(err){
    res.send({success: false, error: "DB error"})
  }
})

function auth(req, res, next) {
  const token = req.headers["authorization"]?.splice (" ")[1];
  const key = PRIVATE_KEY;

  if(!token){
    return res.status(401).send({success: false, error: "Please provide token"});
  }

  jwt.verify(token, key, (err, decoded) => {
    if(err) {
      return res.status(401).send({success: false, error: err.message});
    }
    req.currentUser = decoded;
    next();
  })
}
app.use(auth);

app.use((err, req, res, next) => {
  console.log(err.message);
})

const PORT = 5001;
app.listen(PORT, () => console.log(`listening to ${PORT}...`));