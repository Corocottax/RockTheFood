const mongoose = require("mongoose");
const Ingredient = require("../models/ingredients");
const { deleteFile } = require("../../utils/deleteImg");

const getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    return res.status(200).json(ingredients);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findById(id);
    return res.status(200).json(ingredient);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const createIngredient = async (req, res, next) => {
  try {
    const newIngredient = new Ingredient(req.body);

    const ingredientDuplicated = await Ingredient.findOne({
      name: req.body.name,
    });

    if (ingredientDuplicated) {
      return res.status(400).json("Este ingrediente ya existe");
    }

    if (req.file) {
      newIngredient.logo = req.file.path;
    }

    const ingredient = await newIngredient.save();
    return res
      .status(201)
      .json({ message: "Ingrediente subido correctamente", ingredient });
  } catch (error) {
    console.log(error);

    return res.status(400).json("error");
  }
};

const deleteIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByIdAndDelete(id);
    deleteFile(ingredient.logo);
    return res
      .status(200)
      .json({ message: "Ingrediente eliminado correctamente", ingredient });
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  getIngredients,
  getIngredient,
  createIngredient,
  deleteIngredient,
};
