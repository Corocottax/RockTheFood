const ingredientsRouter = require("./ingredients");
const recipesRouter = require("./recipes");
const usersRouter = require("./users");
const mainRouter = require("express").Router();

mainRouter.use("/ingredients", ingredientsRouter);
mainRouter.use("/recipes", recipesRouter);
mainRouter.use("/users", usersRouter);

module.exports = mainRouter;