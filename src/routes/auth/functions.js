
const { User } = require("../../db");
const {encrypt}= require('../../helpers/handleBcrypt');

const registerCtrl = async (req, res) => {
   /*  try{
        res.send('<h1>Register</h1>');
    } */
     try{
        // 1. Get the user from the request body
        const{ name,email,password } = req.body;
        const passwordHash = await encrypt(password) //2. Encrypt the password
        const registerUser= await User.create({
            name,
            email,
            password:passwordHash //passwordHash is the hashed password
        })
        res.send({data:registerUser});      //3. Send the user to the client
    } 
    catch(err){
        console.log(err); //4. Log the error
        res.status(500).send({error:err.message}); //5. Send the error to the client
    }

}

/* const loginCtrl = async (req, res) => {} */

module.exports = {registerCtrl};