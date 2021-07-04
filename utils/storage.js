const config = require('../config');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadsFolder)
  },
  filename: function (req, file, cb) {
    const extension = (file.mimetype === 'image/jpeg') ? '.jpg' : '.png';
    cb(null, `${file.originalname}`);
  }
});

module.exports = multer({ storage });