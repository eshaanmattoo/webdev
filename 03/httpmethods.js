// Import the built-in 'http' module to create a server
const http = require("http");

// Import the built-in 'fs' module to handle file operations (like reading/writing logs)
const fs = require("fs");

//Import the url module
const url = require("url");


// Create an HTTP server
const myserver = http.createServer((req, res) => {
  if(req.url === '/favicon.ico') return res.end();// dont print the /favicon.ico on log 
  // Create a log entry with the current timestamp and requested URL
  const log = `${Date.now()}:${req.method} :${req.url}: New request received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  // Append the log entry to a file named 'log.txt'
  fs.appendFile("log.txt", log, (err) => {
    // Check for errors while writing the log file
    if (err) {
      res.statusCode = 500;
      res.end("Error writing to log file");
      return;
    }

    // Based on the requested URL, send different responses
    switch (myUrl.pathname) {
      case '/':
        if (req.method === 'GET' ) res.end("ThisIsTheHomepage");
        res.end("hello this is the home page");
        break;

      case '/about':
        const username = myUrl.query.myname;
        res.end(`Hi ${username}`);
        break;
      case '/signup':
        if (req.method === 'GET') res.end("this is a signup form");
          
        else if (req.method === "POST")
          {
            //run db connection and query
            res.end("success");
          }
        
      default:
        res.end("404 - not found");
        break;
    }
  });
});

// Start the server and listen on port 8000
myserver.listen(8000, () => console.log("server started"));
