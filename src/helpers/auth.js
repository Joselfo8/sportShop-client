const { verifyToken } = require('./Token');

const checkPermission = async (req, res, next) => {
     try {
        const recovertoken = req.headers//objeto de cabeceras(authorization,accept,host,connection)
        //console.log(recovertoken)
        const Rtoken = (recovertoken.authorization);
        //console.log(Rtoken)
        const token = Rtoken.split(' ')[1];
        //console.log(token);
        const tokenInfo = await verifyToken(token);
        //console.log(tokenInfo.id);
      if (tokenInfo.id) {
        req.user=tokenInfo;
           next();
        } else {
           res.status(409).send({ msg: 'Unauthorized' })
       }
    } catch (e) {
        res.status(409)
        res.send({ msg: 'You do not have permissions to perform this action' })//por aqui no pasa
    } 
}

module.exports = { checkPermission };