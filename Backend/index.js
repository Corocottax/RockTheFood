require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/api/routes/main");
const { connectCloudinary } = require("./src/config/cloudinary");
const cors = require("cors");

const app = express();

connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});