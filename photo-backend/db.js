//Database
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/backdrop';
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => console.log('Database Connected'));
