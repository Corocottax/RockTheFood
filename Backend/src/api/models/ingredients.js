const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  allergens: [
    {
      type: String,
      enum: [
        "Gluten",
        "Crustáceos",
        "Huevos",
        "Pescado",
        "Cacahuetes",
        "Soja",
        "Leche",
        "Frutos de cáscara",
        "Apio",
        "Mostaza",
        "Sésamo",
        "Sulfitos",
        "Altramuces",
        "Moluscos",
        "Maíz",
        "Carne roja",
        "Pollo",
        "Frutas",
      ],
    },
  ],
});

const Ingredient = mongoose.model(
  "ingredients",
  ingredientSchema,
  "ingredients"
);
module.exports = Ingredient;
