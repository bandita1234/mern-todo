const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

//To use req.body JSON, we need to use this middleware
app.use(express.json());

app.use(cors());

const TodoItemRoute = require('./routes/todoItems');

mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database Connected"))
.catch(err=> console.log(err))


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

app.use('/',TodoItemRoute);