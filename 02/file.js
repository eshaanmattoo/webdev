 const fs = require("fs");
//sync..
//  fs.writeFileSync('./test.txt',"hey there");
//async...
//  fs.writeFile('./test.txt',"hey there async", (err) => {});

// const result = fs.readFileSync("./contacts.txt", 'utf-8');
// console.log(result);

// fs.readFile("./contacts.txt","utf-8",(err, result) => {
//   if (err) {
//     console.log("error",err);
//   }
//   else{
//     console.log(result);
//   }
// });

fs.appendFileSync('./test.txt', `${Date.now()} Hey there\n`);
// fs.cpSync("./test.txt","./copy.txt");
// fs.unlinkSync("./copy.txt");
const text = fs.statSync("./test.txt");
console.log(text);
fs.mkdirSync("my-docs/a",{ recursive:true});