const jwt = require("jsonwebtoken");
const { User } = require("../db");

const tokenSign = async (user) => {
  //Genera el Token
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET, //Secreto de la aplicacion
    {
      expiresIn: "2h", //Tiempo de expiracion
    }
  );
};

const verifyToken = async (token) => {
  //Verifica el Token
  try {
    const thumb = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(thumb)
    return thumb;
  } catch (e) {
    return { msg: "ha fallado la verificacion del token", error: e };
  }
};

const checkRoleUser = (roles) => async (req, res, next) => {
  try {
    //roles = "user" or "admin"
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token)
    const tokenInfo = await verifyToken(token);
    //console.log(tokenInfo.id, tokenInfo.role)
    const userInfo = await User.findByPk(tokenInfo.id);
    //console.log(userInfo.role)
    if (userInfo.role === roles) {
      next();
    } else {
      res.status(409);
      res.send({ error: "you are not autorized" });
    }
  } catch (e) {
    res.status(409);
    res.send({ msg: "por aqui no pasas" }); //por aqui no pasa
  }
};

module.exports = { tokenSign, verifyToken, checkRoleUser };
