const express = require("express");
const{connectMongoDb} = require("./connection");
const app = express();
const fs = require("fs");
const { error } = require("console");
const { type } = require("os");
const PORT = 8000;

const userRouter = require("./routes/user");  

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1");
//middleware
app.use(express.urlencoded({ extended: false }));

//this middleware stops a request from going further
// app.use((req,res,next)=>{
//   console.log("hello from middleware 1");
//   req.MyName = "eshaanmattoo" ;
//   // return res.json({msg : "hello from middleware 1"});//this would have stopped the middleware from sending the req further
//   next();
// });

// app.use((req,res,next)=>{
//   console.log("hello from middleware 2, ", req.MyName);
//   // return res.end("hey");
//   next();
// });

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()}: ${req.ip} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});
//for headers...
app.get("/api/users", async(req, res) => {
  console.log(req.headers);
  res.setHeader("X-Myname", "eshaanmattoo"); //add x before header to show that it is a custom header
  const allDbUsers = await User.find({})

  return res.json(allDbUsers);
});
// routes: ....
app.use("/user", userRouter);

app.listen(PORT, () => console.log("server started"));
