const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const storage = (subDirectory) => {   
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `RockTheFood/${subDirectory}`,
      allowedFormats: ["avif", "png", "jpeg", "jpg", "webp"],
      transformation: [{ fetch_format: "webp", quality: "auto:good" }],
    },
  });
};

const uploadRecipe = multer({ storage: storage("Recipes") });
const uploadIngredient = multer({ storage: storage("Ingredients") });

module.exports = { uploadRecipe, uploadIngredient };
