const express = require('express');
const redis = require('redis');
const { Client } = require('pg');
const mongoose = require('mongoose');

// Initialize app
const PORT = 4000;
const app = express();

// Connect to Redis
const REDIS_HOST = 'localhost'; // Changed from 'redis' to 'localhost'
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to PostgreSQL
const DB_USER_POSTGRES = 'kareem'; // Use the default username or correct one
const DB_PASSWORD_POSTGRES = 'kareem'; // Use the correct password
const DB_PORT_POSTGRES = '5432';
const DB_HOST_POSTGRES = 'localhost'; // Changed from 'postgres' to 'localhost'
const DB_NAME_POSTGRES = 'mydatabase'; // Add the database name here

// Connection URI for PostgreSQL
const URI_POSTGRES = `postgresql://${DB_USER_POSTGRES}:${DB_PASSWORD_POSTGRES}@${DB_HOST_POSTGRES}:${DB_PORT_POSTGRES}/${DB_NAME_POSTGRES}`;

// Create a new PostgreSQL client instance
const clientPostgres = new Client({
  connectionString: URI_POSTGRES,
});

// Connect to the PostgreSQL database
clientPostgres.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Failed to connect to PostgreSQL database:', err));

// Connect to MongoDB
const DB_USER_MONGO = 'root';
const DB_PASSWORD_MONGO = 'example';
const DB_PORT_MONGO = '27017';
const DB_HOST_MONGO = 'localhost'; // Changed from 'mongo' to 'localhost'

const URI_MONGO = `mongodb://${DB_USER_MONGO}:${DB_PASSWORD_MONGO}@${DB_HOST_MONGO}:${DB_PORT_MONGO}`;
mongoose.connect(URI_MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Failed to connect to MongoDB: ${err}`));

