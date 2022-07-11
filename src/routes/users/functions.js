const { User } = require("../../db");
const { Op } = require("sequelize");
const {compare}= require('../../helpers/handleBcrypt');
//recordar user_name
function getUser(id_user) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id_user) {
        return reject("id_user is required");
      }
      let user = await User.findOne({ where: { id: id_user } });
      if (!user) {
        return reject("User not found");
      }
      return resolve(user);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
}


async function postUser(req, res) {
  try {
    const {
      name,
      lastname,
      username,
      password,
      email,
      genre,
      dateOfBirth,
      direction,
    } = req.body;
    if (
      !name ||
      !lastname ||
      !username ||
      !password ||
      !email ||
      !genre ||
      !dateOfBirth ||
      !direction
    ) {
      return res.status(200).json({ msg: "All fields are required" });
    }
    let userExists = await User.findOne({ where: { username: username } });
    if (userExists) {
      return res.status(200).json({ msg: "Username already exists" });
    }
    let user = await User.create({
      name: name,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      genre: genre,
      dateOfBirth: dateOfBirth,
      direction: direction,
    });
    return res.status(200).json({ msg: "User created", user: user });
  } catch (error) {
    res.status(200).json({ msg: "Failed to create user" });
  }

}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return reject("id is required");
    }
    if (Number.isNaN(parseInt(id))) {
      return reject("id must be a number");
    }
    await User.destroy({ where: { id: id } });
    return res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}


async function putUser(req, res) {
  const {
    id,
    name,
    lastname,
    username,
    password,
    email,
    dateOfBirth,
    direction,
  } = req.body;
  if (!id) {
    return res.status(200).json({ msg: "id_user is required" });
  }
  if (Number.isNaN(parseInt(id))) {
    return res.status(200).json({ msg: "id isn´t number" });
  }
  let user = await User.findOne({ where: { id: id } });
  if (!user) {
    return res.status(200).json({ msg: "User not found" });
  }

  if (name) {
    user.name = name;
  }
  if (lastname) {
    user.lastname = lastname;
  }
  if (username) {
    let usuarioExiste = await User.findOne({ where: { username: username } });
    if (usuarioExiste) {
      return res.status(200).json({ msg: "Username already exists" });

}

function loginUser(email, password) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!email || !password) {
        return resolve({
          msg: "all information(email,password) is required",
          access: false,
        });
      }
      let user = await User.findOne({
        where: { email: email},
      });
      const acertijo = compare(user.name, user.email, user.password);
      if (acertijo===false) {
        return resolve({
          msg: "the email incorret or the password is incorrect or the user does not exist",
          access: false,
        });
      }
      return resolve({ msg: `welcome ${user.name}`, access: true, user: user });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
}

module.exports = {
  getUser,
  postUser,
  deleteUser,
  putUser,
  loginUser,
};
