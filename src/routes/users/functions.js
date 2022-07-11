const { User } = require("../../db");
const { Op } = require("sequelize");
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

function deleteUser(id) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return reject("id_user is required");
      }
      await User.destroy({ where: { id: id } });
      return resolve({ msg: "User deleted" });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  return p;
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
    user.username = username;
  }
  if (password) {
    user.password = password;
  }
  if (email) {
    user.email = email;
  }
  if (dateOfBirth) {
    user.dateOfBirth = dateOfBirth;
  }
  if (direction) {
    user.direction = direction;
  }
  user.save();
  return res.status(200).json({ msg: "User updated", user: user });
}

function loginUser(username, password) {
  let p = new Promise(async (resolve, reject) => {
    try {
      if (!username || !password) {
        return resolve({
          msg: "all information(username,password) is required",
          access: false,
        });
      }
      let user = await User.findOne({
        where: { username: username, password: password },
      });
      if (!user) {
        return resolve({
          msg: "the username or password are incorrets",
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
