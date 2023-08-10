const fs = require('fs');
const path = require('path');
const multer = require('multer');
const filePath = path.resolve(__dirname, '../../public/images');

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

module.exports.upload = multer({ storage }).single('avatar');
