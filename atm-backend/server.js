const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const authRoute = require('./routes/userRoutes');
const accountRoute = require('./routes/accountRoutes');

app.use(cors({
  origin: '*'
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });


app.use('/api/auth', authRoute);
app.use('/api/account', accountRoute);



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running on port: ', port);
})