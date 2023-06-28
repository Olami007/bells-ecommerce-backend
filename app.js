var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
let mongoose = require("mongoose");

require("dotenv").config();

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let authRouter = require("./routes/auth");
let productRouter = require("./routes/product");

var app = express();

mongoose.connect(
  "mongodb+srv://olamibells:olamibells@cluster0.ctzumkk.mongodb.net/test"
);
// mongoose.connect(
//   "mongodb+srv://Olami007:Orlarh007@cluster0.hlzvmxr.mongodb.net/test"
// );
let db = mongoose.connection;
db.once("open", function () {
  console.log("DATABASE IS CONNECTED");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors("http://localhost:3000", "*"));

app.use(
  cors({
    exposedHeaders: ["Content-Range"],
  })
);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
