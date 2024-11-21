const cloudinary = require("cloudinary").v2;

const deleteFile = (url) => {
  let array = url.split("/");
  let public_id = `${array.at(-3)}/${array.at(-2)}/${
    array.at(-1).split(".")[0]
  }`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Imagen eliminada");
  });
};

module.exports = { deleteFile };
