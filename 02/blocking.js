const fs = require("fs");
const os = require("os");

console.log("the number of cores: ",os.cpus().length);
console.log("the architecture of the cpu:",os.arch());


// blocking threads: the thread is occupied until the whole task is done
// console.log("1");
// const result = fs.readFileSync("./contacts.txt","utf-8");

// console.log(result);
// console.log("2");


//non blocking
//the threads are free to perform task and theyre not kept occupied
console.log("1");
fs.readFile("./contacts.txt","utf-8",(err,result) => {
  console.log(result);
});

console.log("2");