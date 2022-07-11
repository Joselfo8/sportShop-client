const bcrypt = require('bcryptjs');

const encrypt = async (passText) => {
    const hash = await bcrypt.hash(passText, 10);
    return hash;
}

const compare = async (passwordPlain, passwordHash) => {
}
nodule.exports = { encrypt, compare };