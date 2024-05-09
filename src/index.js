const express = require('express');
const redis = require('redis');
// const mongoose = require('mongoose'); // Commented out Mongoose
// const { Client } = require('pg'); // Import PostgreSQL Client

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

// Define route for setting Redis value
app.get('/', (req, res) => {
  redisclient.set('products', 'products');
  res.send('<h1>Hello kemo! basha aws prof super prof15000</h1>');
});

// Define route for getting Redis value
app.get('/data', async (req, res) => {
  const products = await redisclient.get('products');
  res.send(`<h1>Hello kemo!</h1><h2>${products}</h2>`);
});

// Connect to PostgreSQL (Commented out)
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '5432';
// const DB_HOST = 'postgres'; 

// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//   connectionString: URI,
// });

// client
//   .connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch((err) => console.log(`Failed to connect to PostgreSQL: ${err}`));

// Start server
app.listen(PORT, () => console.log(`App is up and running on port: ${PORT}`));
