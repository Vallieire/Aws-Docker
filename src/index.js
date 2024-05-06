const express = require('express');
//const mongoose = require('mongoose');
const redis = require('redis');
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


//  Connect to Postgres
 
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '5432';
const DB_HOST = 'postgres'; 

const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
  connectionString: URI,
});

client
  .connect()
  .then(() => console.log('Connected to PostgresDB'))
  .catch((err) => console.log(`Failed to connect to PostgresDB: ${err}`));



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
