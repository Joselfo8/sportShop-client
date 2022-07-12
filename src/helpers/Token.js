const jwt = require('jsonwebtoken');

const tokenSign=async(user)=>{ //Genera el Token
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,//Secreto de la aplicacion
        {
            expiresIn: "2h", //Tiempo de expiracion
        }
    )}

    const verifyToken=async(token)=>{ //Verifica el Token
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(e){
        return null
    }
    }
    
    const checkRoleUser = (roles)=> async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ').pop();
            const tokenInfo = await verifyToken(token);
            const userInfo = await userModel.findById(tokenInfo.id);
            console.log(userInfo) //{ id: 1, role: 'user', iat: 1657604604, exp: 1657611804 }
           /* if(roles!==1){
            //if([].concat(roles).includes(userInfo.role)){
                next()
            }else{
                res.status(409)
                res.send({error:'do Not have permised '})
            } */
            next
        } catch (e) {
            res.status(409)
            res.send({ msg: 'por aqui no pasas' })//por aqui no pasa
        }
    }

module.exports={tokenSign,verifyToken, checkRoleUser};