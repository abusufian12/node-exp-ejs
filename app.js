const express = require('express');
var http = require('http');
var dt = require('./example-pages/myfirstmodule');

var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {

//   res.write("The date and time are currently: " + dt.myDateTime());
//   console.log(`Example app listening at http://localhost:${port}`)
// })


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(3000);