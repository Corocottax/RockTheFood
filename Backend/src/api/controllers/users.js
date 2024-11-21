const { sendEmail } = require("../../config/nodemailer");
const { verifyEmail } = require("../../utils/validations/email");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const { generateKey } = require("../../utils/jwt");

const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    /*  const userDuplicated = await User.findOne({ email });

    if (userDuplicated) {
      return res.status(400).json("Usuario existente");
    } */

    if (!verifyEmail(email)) {
      return res.status(400).json("Introduce un formato de email válido");
    }

    const newUser = new User({ email, name, password });

    await newUser.save();

    sendEmail(email, name, newUser._id.toString(), password);

    return res.status(201).json("Cuenta de usuario creada correctamente");
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("El usuario o la contraseña son incorrectos");
    }

    const id = user._id.toString();

    if (!user.verified) {
      sendEmail(email, user.name, id);
      return res.status(400).json("Verifica tu correo antes de continuar");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateKey(id);
      return res.status(200).json({ message: "Login satisfecho", token, user });
    } else {
      return res.status(400).json("El usuario o la contraseña son incorrectos");
    }
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true }
    );

    req.body = user;

    const token = generateKey(id, "1h");
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(400).json("Error");
  }
};

const checkSession = async (req, res, next) => {
  return res
    .status(200)
    .json({ user: req.user, token: req.headers.authorization });
};

module.exports = { register, verifyAccount, login, checkSession };
