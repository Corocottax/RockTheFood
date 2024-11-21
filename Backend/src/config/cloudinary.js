const cloudinary = require("cloudinary").v2;

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  cloudinary.api
    .ping()
    .then(() => console.log("Conectados a Cloudinary"))
    .catch(() => console.log("Fallo conectando con cloudinary"));
};

module.exports = { connectCloudinary };
