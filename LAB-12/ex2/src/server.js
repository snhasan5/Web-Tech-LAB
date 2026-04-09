const app = require('./app');

const INITIAL_PORT = Number(process.env.PORT) || 3001;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Middleware demo server running at http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use. Trying port ${port + 1}...`);
      startServer(port + 1);
      return;
    }

    console.error('Server failed to start:', error.message);
    process.exit(1);
  });
}

startServer(INITIAL_PORT);
