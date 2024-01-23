const http = require('http');

http.createServer((req, res) => {
    res.write('Being a full stack developer');
    res.end('Hello World\n');
}).listen(3001);

console.log('Server running at http://localhost:3001/');