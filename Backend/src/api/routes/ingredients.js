const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const { uploadIngredient } = require("../../middlewares/upload");
const {
  getIngredients,
  getIngredient,
  createIngredient,
  deleteIngredient,
} = require("../controllers/ingredients");

const ingredientsRouter = require("express").Router();

ingredientsRouter.get("/", getIngredients);
ingredientsRouter.get("/:id", getIngredient);
ingredientsRouter.post(
  "/",
  isAuth,
  isAdmin,
  uploadIngredient.single("logo"),
  createIngredient
);
ingredientsRouter.delete("/:id", isAuth, isAdmin, deleteIngredient);

module.exports = ingredientsRouter;
