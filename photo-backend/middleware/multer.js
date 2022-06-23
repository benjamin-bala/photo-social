const multer = require('multer');
const cloudinary = require('../utils/cloudinaryConfig').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const crypto = require('crypto');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'BACKDROPS',
  allowedFormats: ['jpeg', 'jpg', 'png'],
  filename: (req, file, cb) => {
    let buf = crypto.randomBytes(16);
    buf = buf.toString('hex');
    let uniqueFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/gi, '');
    uniqueFileName += buf;
    cb(undefined, uniqueFileName);
    // console.log('from multer', req.body);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
