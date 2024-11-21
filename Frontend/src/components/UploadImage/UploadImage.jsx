import "./UploadImage.css";

const UploadImage = ({ setImage, image, imageRef }) => {
  const handleImage = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className="div_image">
      <label htmlFor="image" className="image">
        Subir imagen
        <img src="/icons/upload.png" alt="subir imagen del ingrediente" />
      </label>
      <input
        id="image"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => handleImage(e, setImage)}
        ref={imageRef}
      />
      {image && <img src={image} alt="contenido subido por el usuario" />}
    </div>
  );
};

export default UploadImage;
