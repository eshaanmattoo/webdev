const express = require("express");
const router = express.Router();


// router.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({})
//   const html = `
//   <ul>
//       ${allDbUsers.map((user) => `<li>${user.firstName} -${user.email}</li>`).join("")}
//   </ul>
//   `;
//   res.send(html);
// });

router.get("/", (req, res) => {
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

//group all methods where the route is same
router
  .route("/:id")
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

router .post("/", async (req, res) => {
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

module.exports = router;