const express = require("express");
const connectDB = require('./db');
const postRoutes = require('./routes/post');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/v1/post', postRoutes);


const PORT = process.env.PORT || 4002;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  