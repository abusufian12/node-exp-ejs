const express = require("express");
var http = require('http');
const path = require('path');
const app = express();
var fs = require('fs');
// app.listen(3000, () => {
//   console.log("Application started and Listening on port 3000");
// });


// Create a server object
http.createServer(function (req, res) {
      
  // http header
  res.writeHead(200, {'Content-Type': 'text/html'}); 
  
  fs.createReadStream(path.resolve(__dirname, 'index.html')) 
  .pipe(res);
  app.use(express.static('public'));

  res.write('<ul><li><a herf="#">Users</a></li> <li><a herf="#">Posts</a></li></ul>'); 
  var url = req.url;
    
  if(url ==='/about') {
      res.write(' Welcome to about us page<br>');
      var dt = require('./example-pages/myfirstmodule');
      res.write("The date and time are currently: " + dt.myDateTime()); 
      //res.end(); 
  }
  else if(url ==='/contact') {
      res.write(' Welcome to contact us page'); 
      //res.end(); 
  }
  else {
      res.write('Hello World!'); 
      //res.end(); 
  }
}).listen(3000, function() {
    
  // The server object listens on port 3000
  console.log("server start at port 3000");
});


