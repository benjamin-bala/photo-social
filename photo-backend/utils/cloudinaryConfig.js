const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'everydevthing',
  api_key: '457922668847821',
  api_secret: 'iVqKfBKkCpmFswZv7IL94wci1EE',
});

module.exports = cloudinary;
