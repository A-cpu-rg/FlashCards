require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const Card = require('./models/card')
const cookieParser = require("cookie-parser");

mongoose
  .connect("mongodb+srv://vikassai818:GQ01FztiMZHHumSp@cluster0.go72g.mongodb.net/Cluster0")
  .then((e) => console.log("MongoDB Connected"));

const userRoute = require("./routes/user");
const cardRoute = require("./routes/card");
const path = require("path");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')))
app.use(checkForAuthenticationCookie("token"));
app.get("/", async(req, res) => {
  const allcards = await Card.find({})
  res.render("home", { user: req.user,cards : allcards});
});
app.get("/landing", async(req, res) => {
  const allcards = await Card.find({})
  res.render("landing");
});
app.use("/user", userRoute);
app.use("/card", cardRoute);

app.listen(PORT, () => console.log(`Server Started On ${PORT}`));
