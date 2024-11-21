const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  img: { type: String, required: true },
  ingredients: [
    {
      quantity: { type: String, required: true },
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "ingredients" },
    },
  ],
  title: { type: String, required: true },
  likes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  time: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ["Alta", "Media", "Baja"] },
  steps: [
    {
      description: { type: String, required: true },
      time: { type: Number, required: true },
    },
  ],
  advices: [{ type: String }],
  allergens: [{ type: String }]
});

const Recipe = mongoose.model("recipes", recipeSchema, "recipes");
module.exports = Recipe;
