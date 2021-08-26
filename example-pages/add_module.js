const express = require('express');

var http = require('http');
const path = require('path');
var fs = require('fs');

var dt = require('./myfirstmodule');

var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

const app = express()
const port = 3000

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
   res.write("Hello Sufian<br>");
   res.write("The date and time are currently: " + dt.myDateTime());
  //res.sendfile(__dirname + "summer.html");

  fs.createReadStream(path.resolve(__dirname, 'summer.html')) 
  .pipe(res);

   //res.end();
}).listen(`${port}`);

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/summer.html");
//     app.use(express.static('public'));
//   });


