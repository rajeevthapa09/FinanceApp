
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());


app.listen(5001, ()=>{
    console.log("server listening on port 5001")
})