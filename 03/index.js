// Import the built-in 'http' module to create a server
const http = require("http");

// Import the built-in 'fs' module to handle file operations (like reading/writing logs)
const fs = require("fs");

// Create an HTTP server
const myserver = http.createServer((req, res) => {
  // Create a log entry with the current timestamp and requested URL
  const log = `${Date.now()}: ${req.url}: New request received\n`;

  // Append the log entry to a file named 'log.txt'
  fs.appendFile("log.txt", log, (err) => {
    // Check for errors while writing the log file
    if (err) {
      res.statusCode = 500;
      res.end("Error writing to log file");
      return;
    }

    // Based on the requested URL, send different responses
    switch (req.url) {
      case '/':
        res.end("hello this is the home page");
        break;

      case '/about':
        res.end("my name is eshaan mattoo");
        break;

      default:
        res.end("404 - not found");
        break;
    }
  });
});

// Start the server and listen on port 8000
myserver.listen(8000, () => console.log("server started"));
