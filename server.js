const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT);

mongoose.connect(process.env.ATLAS_URI || "mongodb+srv://cluster0.rt7fw.mongodb.net/watchlist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));
        const path = require('path');
        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
      }
});

