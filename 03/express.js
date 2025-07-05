const http = require("http");
const fs = require("fs");
const url = require("url");
// include the express framework and initialize it
const express = require("express");
const app = express();

app.get("/", (req,res) => {
  return res.send("hello from home page");
});
app.get("/about", (req,res) => {
  return res.send(`hello ${req.query.name}`);
});

app.listen(8000, () => console.log("server started"));