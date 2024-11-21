const { deleteFile } = require("../../utils/deleteImg");
const Ingredient = require("../models/ingredients");
const Recipe = require("../models/recipes");
const mongoose = require("mongoose");

const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = new Recipe(req.body);

    const recipeDuplicated = await Recipe.findOne({
      title: req.body.title,
    });

    if (recipeDuplicated) {
      return res.status(400).json("Receta ya existente");
    }

    if (req.file) {
      newRecipe.img = req.file.path;
    }

    const recipe = await newRecipe.save();
    return res
      .status(201)
      .json({ message: "Receta subida correctamente", recipe });
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const {
      difficulty = "",
      allergensToExclude,
      time = 99999999999999,
      title = "",
      orderByLikes,
    } = req.query;

    const query = {
      title: { $regex: title, $options: "i" },
      time: { $lte: parseInt(time) },
      difficulty: { $regex: difficulty, $options: "i" },
      allergens: { $nin: allergensToExclude?.split("_") || [] },
    };

    const recipes = orderByLikes
      ? await Recipe.aggregate([
          {
            $match: query,
          },
          {
            $lookup: {
              from: "ingredients",
              localField: "ingredients.ingredient",
              foreignField: "_id",
              as: "ingredients",
            },
          },
          {
            $addFields: {
              likesCount: { $size: "$likes" },
            },
          },
          {
            $sort: { likesCount: -1 },
          },
        ])
      : await Recipe.find(query).populate("ingredients.ingredient");

    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(400).json("error");
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate("ingredients.ingredient");
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipeDuplicated = await Recipe.findOne({
      title: req.body.title,
    });

    if (recipeDuplicated) {
      return res.status(400).json("Receta ya existente");
    }

    if (req.file) {
      req.body.img = req.file.path;
    }

    const getAllergens = async (id) => {
      const ingredient = await Ingredient.findById(id);
      const allergens = [];

      for (const allergen of ingredient.allergens) {
        if (!allergens.includes(allergen)) {
          allergens.push(allergen);
        }
      }

      return allergens;
    };

    let allergens = [];

    if (req.body?.ingredients) {
      const allergenPromises = req.body.ingredients.map((ingredient) =>
        getAllergens(ingredient.ingredient)
      );

      const allAllergens = await Promise.all(allergenPromises);

      const allergensSet = new Set();

      allAllergens.forEach((allergens) => {
        allergens.forEach((allergen) => {
          allergensSet.add(allergen);
        });
      });

      const uniqueAllergens = Array.from(allergensSet);

      allergens = [...uniqueAllergens];
    }

    const recipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        time: req.body.time,
        img: req.body.img,
        difficulty: req.body.difficulty,
        $addToSet: {
          likes: req.body.likes,
          advices: req.body.advices,
          ingredients: req.body.ingredients && [...req.body.ingredients],
          allergens: allergens,
        },
        $push: { steps: req.body.steps },
      },
      { new: true }
    );

    if (req.file) {
      deleteFile(recipe.img);
    }

    return res
      .status(200)
      .json({ message: "Receta actualizada correctamente", recipe });
  } catch (error) {
    console.log(error);
    return res.status(400).json("error");
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const { id, addLike } = req.params;

    const query = {};
    let property;

    addLike === "true" ? (property = "$addToSet") : (property = "$pull");

    query[property] = {
      likes: req.body.likes[0],
    };

    console.log(addLike);

    console.log(query);

    const recipe = await Recipe.findByIdAndUpdate(id, query, { new: true });

    return res
      .status(200)
      .json({ message: "Like cambiado correctamente", recipe });
  } catch (error) {
    console.log(error);
    return res.status(400).json("error");
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    deleteFile(recipe.img);
    return res.status(200).json({ message: "Receta eliminada", recipe });
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  toggleLike,
};
