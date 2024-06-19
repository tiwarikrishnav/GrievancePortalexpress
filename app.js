const express = require("express");
const app = express();
const port = 15000;
const web = require('./route/web');
const cloudinary = require("cloudinary");
const connectDb = require("./db/connectDB");
connectDb();

const bodyParser = require("body-parser")
app.use(bodyParser.json())
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const session = require('express-session')
const flash = require("connect-flash");
app.use(flash());

app.use(session({
  secret: 'secret',
  cookie: {maxAge: 6000},
  resave: false,
  saveUninitialized: false,
}));


const fileUpload = require('express-fileupload')
app.use(fileUpload({useTempFiles:true}))

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");
app.use(express.static("public"));






app.use("/",web)


app.listen(port, () => {
  console.log(`server start localhost:${port}`);
});
