const { verifyToken } = require("./Token");

const checkRole = async (req, res, next) => {
  try {
    const recovertoken = req.headers; //objeto de cabeceras(authorization,accept,host,connection)
    //console.log(recovertoken)
    const Rtoken = recovertoken.authorization;
    //console.log(Rtoken);
    if (Rtoken === undefined) {
      req.user = {
        id: 0,
        role: "ghost",
      };
      return next();
    } else {
      const token = Rtoken.split(" ")[1];
      //console.log(token);
      const tokenInfo = await verifyToken(token);
      //console.log(tokenInfo.id);
      if (tokenInfo.id) {
        req.user = tokenInfo;
        return next();
      } else {
        res.status(409).send({ msg: "Token invalid" });
      }
    }
  } catch (e) {
    res.status(409);
    res.send({ msg: "error to check token" }); //por aqui no pasa
  }
};

module.exports = { checkRole };
