//initializes

const mongoose = require("mongoose");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const bodyParser = require("body-parser");
//app
const app = express();
app.use(bodyParser.json()); //parsing json files
//routes
const productRoute = require("./routes/product");
const homeRoute = require("./routes/home");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");

//middleware
app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));
app.use(
  "/image",
  express.static(path.join(__dirname + "/resources/static/assets/uploads"))
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.disable("view cache");

app.use("/", homeRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
//mongoose
const STR_CONNECT =
  "mongodb+srv://linhdatran3:data123@silkshop.jpiay.mongodb.net/DBDemo02?retryWrites=true&w=majority";
const connectMogoose = async () => {
  try {
    await mongoose.connect(STR_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connect database successfully abc");
  } catch (e) {
    console.log(e);
    console.log("thất bại");
  }
};

connectMogoose();

app.listen(process.env.PORT || 3000);
