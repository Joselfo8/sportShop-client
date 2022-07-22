const { User, ShippingAddress } = require("../../db");
const { Op } = require("sequelize");
const { compare, encrypt } = require("../../helpers/handleBcrypt");
const { tokenSign } = require("../../helpers/Token");

const rols = ["admin", "user"];

//recordar user_name
async function getAllUser(req, res) {
  try {
    const { role } = req.query;
    let where = { where: {}, include: "shippingAddresses" };
    if (role) {
      where.where.role = role;
    }
    let users = await User.findAll(where);

    return res.send({ msg: "Users found", users });
  } catch (error) {
    console.log(error);
    res.send({ msg: "error" });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send({ msg: "id_user is required" });
    }
    let user = await User.findOne({ where: { id } });
    if (!user) {
      return res.send({ msg: "User not found" });
    }
    return res.send({ msg: "User found", user });
  } catch (error) {
    console.log(error);
    return res.send({ msg: error });
  }
}

async function getUserData(req, res) {
  try {
    const { id } = req.user;
    if (!id) return res.status(400).json({ msg: "ID is required" });

    const user = await User.findOne({
      where: { id },
      attributes: [
        "googleId",
        "name",
        "lastname",
        "email",
        "genre",
        "dateOfBirth",
        "trolly",
      ],
      include: "shippingAddresses",
    });
    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.status(200).json({ msg: "User found", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
}

async function postUser(req, res) {
  try {
    const {
      name,
      lastname,
      password,
      email,
      genre,
      dateOfBirth,
      direction,
      country,
      state,
      city,
      numberPhone,
      role,
    } = req.body;

    // console.log(name);
    if (!name || !password || !email) {
      return res
        .status(200)
        .json({ msg: "fields (name, password and email) are required" });
    }
    let userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(200).json({ msg: "email already is  register" });
    }

    if (role && !rols.includes(role)) {
      return res.status(200).json({ msg: "role not valid" });
    }

    hashPass = await encrypt(password);

    let user = await User.create({
      name: name,
      lastname: lastname,
      password: hashPass,
      email: email,
      genre: genre,
      dateOfBirth: dateOfBirth,
      direction: direction,
      country: country,
      city: city,
      state: state,
      numberPhone: numberPhone,
      role: role,
    });

    await user.createFavorite({ name: user.email });
    return res.status(200).json({ msg: "User created", user: user });
  } catch (error) {
    console.log("error", error);
    res.status(200).json({ msg: "Failed to create user", error });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.send({ msg: "id is required" });
    }
    if (Number.isNaN(parseInt(id))) {
      return res.send({ msg: "id isn´t number" });
    }
    await User.destroy({ where: { id: id } });
    return res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
//PUT
async function putUser(req, res) {
  const { id } = req.params;

  try {
    const { password, email, ...data } = req.body;

    // get user by id
    const user = await User.findOne({
      where: { id: id },
      include: "shippingAddresses",
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    // email can't be update
    if (email) return res.status(400).json({ msg: "Email can't be update" });

    // password can't be update
    if (password)
      return res.status(400).json({ msg: "Password can't be update" });

    // update user data
    user.set(data);
    await user.save();

    // send all values, less password
    const { password: _1, ...response } = user.dataValues;

    res.status(200).json({
      msg: "User updated",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    // res.status(200).json({ msg: "Failed to update user" });
  }
}

async function addShippingAddress(req, res) {
  const id = req.params.id;

  try {
    // get user by id
    const user = await User.findOne({
      where: { id: id },
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    // create one address, associate with user and save
    const newAddr = await ShippingAddress.create(req.body);
    await user.addShippingAddress(newAddr);

    res.status(200).json({
      msg: "Shipping address added",
      data: newAddr,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function updateShippingAddress(req, res) {
  const id = req.params.id;

  try {
    // get address by id
    const address = await ShippingAddress.findOne({
      where: { id },
    });

    if (!address)
      return res.status(404).json({ msg: "Shipping address not found" });

    // update address
    address.set(req.body);
    await address.save();

    res.status(200).json({
      msg: "Shipping address updated",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function deleteShippingAddress(req, res) {
  const id = req.params.id;

  try {
    // get user by id
    const address = await ShippingAddress.findOne({
      where: { id },
    });

    if (!address)
      return res.status(404).json({ msg: "Shipping address not found" });

    // delete from db
    await address.destroy();

    res.status(200).json({
      msg: "Shipping address deleted",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function loginUser(req, res) {
  /// Post para iniciar sesion
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        msg: "Email and password are required",
      });

    // search user in db
    let user = await User.findOne({
      where: { email },
      attributes: ["name", "id", "role", "password"],
      include: "shippingAddresses",
    });

    // hash password and compare with db hash
    const acertijo = await compare(password, user.password);
    // console.log(acertijo);

    // create jwt token, needs id and role
    const token = await tokenSign(user);

    if (acertijo === false) {
      //redirect to postUser
      return res.send({
        msg: `the ${user.email} is incorret or the password is incorrect or the user does not exist`,
        access: false,
        redirect: "/user", //redirect a pagina de registro
      });
    }
    return res.status(200).json({
      msg: `Welcome ${user.name}`,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ msg: "the password or email is incorrect" });
  }
}

async function logOut(req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.send({ msg: "token is required" });
    }
    const decoded = await tokenVerify(token);
    if (!decoded) {
      return res.send({ msg: "token is invalid" });
    }
    return res.send({ msg: "logout success" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "error" });
  }
}

module.exports = {
  getUser,
  getUserData,
  postUser,
  deleteUser,
  putUser,
  loginUser,
  getAllUser,
  logOut,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
