const express = require('express');
//const mongoose = require('mongoose');
const redis = require('redis');
const { createClient } = require('redis');
const { Client } = require('pg');


// Initialize app
const PORT = 4000;
const app = express();

// Connect to Redis
const REDIS_HOST = 'redis';
const REDIS_PORT = '6379';
const redisclient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisclient.on('error', err => console.log('Redis Client Error', err));
redisclient.on('connect', () => console.log('Connected to Redis....'));
redisclient.connect();

// Define route for setting Redis value
app.get('/', (req, res) => {
  redisclient.set('products', 'products');
  res.send('<h1>Hello kemo!</h1>');
});

// Define route for getting Redis value
app.get('/data', async (req, res) => {
  const products = await redisclient.get('products');
  res.send(`<h1>Hello kemo!</h1><h2>${products}</h2>`);
});


// Start the server
const port = 4001; // Change to a different port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//  Connect to Postgres

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '5432';
const DB_HOST = 'postgres';

// Connection URI
const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// Create a new PostgreSQL client instance
const clientInstance = new Client({
  connectionString: URI,
});

// Connect to the PostgreSQL database
clientInstance.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Failed to connect to PostgreSQL database:', err));



// Connect to MongoDB
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '27017';
// const DB_HOST = 'mongo'; 

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose.connect(URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log(`Failed to connect to MongoDB: ${err}`));

// Start server
app.listen(PORT, () => console.log(`App is up and running on port: ${PORT}`));