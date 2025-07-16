const express = require("express");
// const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const { error } = require("console");
const { type } = require("os");
const PORT = 8000;

//connect to the mongoose database first
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("mongo error: ", err));
//schema for database

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
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
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({})
  const html = `
  <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName} -${user.email}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

//rest api points
/*
app.get('/api/users/:id', (req,res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});




app.patch('/api/users/:id', (req,res) => {
  // will implement further: edit the user with id
  return res.json({status: "pending"});
});




app.delete('/api/users/:id', (req,res) => {
  // will implement further: delete user with id
  return res.json({status: "pending"});
});
*/
app.get("/", (req, res) => {
  const html = `
    <a href="api/users">users</a><br>
    <a href="/users">users in html list</a><br>
    
  `;
  res.send(html);
});
//group all methods where the route is same
app
  .route("/api/users/:id")
   .get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async(req, res) => {
    
    // const id = Number(req.params.id);
    // const body = req.body;
    await User.findByIdAndUpdate(req.params.id,{lastName: "changed"}); //the "changed" data will come from the frontend 

    return res.status(201).res.json({ status: "success" });
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);

    return res.status(201).json({ status: "success" });
  });

app.post("/api/users", async (req, res) => {
  // will implement further: create new user
  const body = req.body;
  console.log("body", body);
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => console.log("server started"));
