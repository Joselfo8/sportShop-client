const { verifyToken } = require('./Token');

const checkPermission = async (req, res, next) => {
    try {
        //const token = req.headers['authorization'];
        //console.log(token);
        const token = req.headers.authorization.split(' ').pop();
        const tokenInfo = await verifyToken(token);
        console.log(tokenInfo)
        if (tokenInfo.id) {
            //req.user=tokenInfo;
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