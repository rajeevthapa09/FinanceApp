
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

//initialization
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const PORT = 5001;

mongoose.connect('mongodb://127.0.0.1:27017/finance')
  .then(() => {
    app.listen(PORT, () => console.log(`listening to ${PORT}...`));
  })

app.use((err, req, res, next) => {
  console.log(err.message);
})