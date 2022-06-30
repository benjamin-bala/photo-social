require('process');
require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const formidable = require('express-formidable');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(formidable());

app.get('/', (req, res) => {
  res.send('Backdrop server up and running');
});

//Routes
const userRoute = require('./routes/user');
const photoRoute = require('./routes/photo');

app.use('/user', userRoute);
app.use('/photo', photoRoute);

app.listen(PORT, () =>
  console.log(`Backdrop server up and running on port ${PORT}`)
);
