const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Powered-By', 'Node.js');

  res.write('<!DOCTYPE html>');
  res.write('<html lang="en">');
  res.write('<head>');
  res.write('<meta charset="UTF-8" />');
  res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0" />');
  res.write('<title>Node.js HTTP Server</title>');
  res.write('</head>');
  res.write('<body style="font-family: Arial, sans-serif; padding: 24px;">');
  res.write('<h1>Node.js Server Response</h1>');
  res.write('<p>Your request was handled successfully without any external framework.</p>');
  res.write(`<p><strong>Method:</strong> ${req.method}</p>`);
  res.write(`<p><strong>URL:</strong> ${req.url}</p>`);
  res.write('</body>');
  res.write('</html>');

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
