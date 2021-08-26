var http = require('http');
var url = require('url');
var fs = require('fs');

// var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
// var qu = url.parse(adr, true);
// console.log(qu.host); //returns 'localhost:8080'

http.createServer(function (req, res) {
  
//   console.log(req, 'req');  
//   console.log(res, 'res');  
  var q = url.parse(req.url, true);
  
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);

    //console.log(q);
    return res.end();
  });
}).listen(3000);