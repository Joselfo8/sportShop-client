const { verifyToken } = require("./Token");

const checkRole = async (req, res, next) => {
  try {
    const recovertoken = req.headers; //objeto de cabeceras(authorization,accept,host,connection)
    const Rtoken = recovertoken.authorization;
    const token = Rtoken.split(" ")[1];
    const tokenInfo = await verifyToken(token);

    if (tokenInfo.id) {
      req.user = tokenInfo;
      return next();
    } else {
      res.status(409).send({ msg: "Token invalid" });
    }
  } catch (e) {
    res.status(409).json({ msg: "error to check token" }); //por aqui no pasa
  }
};

module.exports = { checkRole };
