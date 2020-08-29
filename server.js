const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5000;

app.listen(PORT);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri || "mongodb+srv://cluster0.rt7fw.mongodb.net/watchlist", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connected");
});

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}