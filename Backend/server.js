const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const connectToDb = require('./db/db');  // Import DB connection
const port = process.env.PORT || 3000;

// Create the server
const server = http.createServer(app);

// Initialize socket connection (if you're using Socket.IO)
initializeSocket(server);

// Log to track the start of server initialization
console.log("Starting server...");

// Wait for DB connection to establish before starting the server
const startServer = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await connectToDb();  // Wait for MongoDB to connect
    console.log("MongoDB connected successfully!");

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);  // Exit the process if DB connection fails
  }
};

startServer();  // Start the server only after DB is connected
