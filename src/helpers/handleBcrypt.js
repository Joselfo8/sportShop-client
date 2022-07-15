const bcrypt = require('bcryptjs');

const encrypt = async (passText) => {
    const hash = await bcrypt.hash(passText, 8); //10 is the number of rounds
    return hash;
}
//solo comparamos ninca se desencriptan los datos
const compare = async (passwordPlain, passwordHash) => {
    return await bcrypt.compare(passwordPlain, passwordHash); //returns true or false 
}
module.exports = { encrypt, compare };