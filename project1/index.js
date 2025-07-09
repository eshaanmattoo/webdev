const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const PORT = 8000;

//middleware
app.use(express.urlencoded({ extended: false}));

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

app.use((req,res , next)=>{
  fs.appendFile('log.txt',`\n ${Date.now()}: ${req.ip} : ${req.method} : ${req.path}`, (err,  data) => {
    next();
    
  });
});
//for headers...
app.get('/api/users', (req,res) => {
  console.log(req.headers);
  res.setHeader("X-Myname", "eshaanmattoo");//add x before header to show that it is a custom header
  return res.json(users);
});
// routes: ....
app.get('/users', (req,res) =>{
  const html = `
  <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});


app.get('/api/users', (req,res) => {
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
app.get("/",(req,res)=>{
  const html = `
    <a href="api/users">users</a><br>
    <a href="/users">users in html list</a><br>
    
  `;
  res.send(html)}
);
//group all methods where the route is same
app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req,res)=>{
  // will implement further: edit the user with id
  // const id = Number(req.params.id);
  // const body = req.body;

  return res.json({status: "pending"});
}).delete((req,res)=>{
    // will implement further: delete user with id
  return res.json({status: "pending"});
})




app.post('/api/users', (req,res) => {
  // will implement further: create new user
  const body = req.body;  
  console.log("body", body);
  users.push({...body, id: users.length+1});
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
    return res.json({status: "success", id : users.length});
  });
   
});



app.listen(PORT, () => console.log("server started")); 