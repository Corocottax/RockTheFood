const User = require("../api/models/users");
const { verifyKey } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const { id } = verifyKey(token);
        const user = await User.findById(id);

        user.password = null;
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json("No estás autorizado");
    }
}

module.exports = { isAuth };