const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const { uploadRecipe } = require("../../middlewares/upload");
const {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  toggleLike,
} = require("../controllers/recipes");

const recipesRouter = require("express").Router();

recipesRouter.post(
  "/",
  isAuth,
  isAdmin,
  uploadRecipe.single("img"),
  createRecipe
);
recipesRouter.get("/", isAuth, getRecipes);
recipesRouter.get("/:id", isAuth, getRecipe);
recipesRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  uploadRecipe.single("img"),
  updateRecipe
);
recipesRouter.put("/toggleLike/:id/:addLike", isAuth, toggleLike);
recipesRouter.delete("/:id", isAuth, isAdmin, deleteRecipe);

module.exports = recipesRouter;
