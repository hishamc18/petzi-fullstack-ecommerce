const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Add your Cloudinary cloud name
  api_key: process.env.CLOUD_API_KEY, // Add your Cloudinary API key
  api_secret: process.env.CLOUD_API_SECRET, // Add your Cloudinary API secret
});

module.exports = cloudinary;
