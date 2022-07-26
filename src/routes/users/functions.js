const { User, ShippingAddress } = require("../../db");
const { Op } = require("sequelize");
const { compare, encrypt } = require("../../helpers/handleBcrypt");
const { tokenSign,verifyToken } = require("../../helpers/Token");

const rols = ["admin", "user"];

// Get admin confirm roles by token answer true or false 

async function getCheckAdmin(req, res) {
  try {
    const { token } = req.query;
    //console.log(token);
    const thumb = await verifyToken(token);
    if (!thumb) return res.status(401).json({ msg: "Token invalid" });
    //console.log(thumb.role)//admin
     if (thumb.role === "admin"){
      return res.send( true );
    }
      return res.send(false);
  } catch (error) {
    console.log(error);
    res.status(200).json({ msg: "Failed to check admin" });
  }
}

//recordar user_name
//get all users by user_name
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
    let { id } = req.params;

    //validate id
    if (!id) {
      return res.send({ msg: "id_user is required" });
    }
    if (isNaN(Number(id))) {
      return res.send({ msg: "id_user must be a number" });
    }
    id = parseInt(id);

    //validate authenritation
    if (req.user.role === "user" && req.user.id !== id) {
      return res.send({ msg: "You don't have permission" });
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
  try {
    let { id } = req.params;
    //validate id
    if (!id) {
      return res.send({ msg: "id is required" });
    }
    if (Number.isNaN(parseInt(id))) {
      return res.send({ msg: "id isn´t number" });
    }
    id = parseInt(id);
    //validate authenritation
    if (req.user.role === "user" && req.user.id !== id) {
      return res.send({ msg: "You can´t delete other users" });
    }

    await User.destroy({ where: { id: id } });
    return res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed to delete user", error });
  }
}
//PUT
async function putUser(req, res) {
  try {
    let { id } = req.params;
    const { password, email, role, ...data } = req.body;

    //validate id
    if (!id) {
      return res.send({ msg: "id is required" });
    }
    if (Number.isNaN(parseInt(id))) {
      return res.send({ msg: "id isn´t number" });
    }
    id = parseInt(id);

    //validate authenritation
    if (req.user.role === "user" && req.user.id !== id) {
      return res.send({ msg: "You can´t update other users" });
    }

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

    //only admin can update role
    if (role && req.user.role !== "admin") {
      return res.status(400).json({ msg: "Only admin can update role" });
    }

    // update user data
    if (req.user.role === "admin") {
      user.set({ role });
    } else {
      user.set({ ...data, role });
    }
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

    if (!email || !password) {
      return res.send({
        msg: "Email and password are required",
        access: false,
      });
    }

    // search user in db
    let user = await User.findOne({
      where: { email },
      include: "shippingAddresses",
    });

    // hash password and compare with db hash
    const acertijo = await compare(password, user.password);
    // console.log(acertijo);

    // create jwt token
    const token = await tokenSign(user);

    if (acertijo === false) {
      //redirect to postUser
      return res.send({
        msg: `the ${user.email} is incorret or the password is incorrect or the user does not exist`,
        access: false,
        redirect: "/user", //redirect a pagina de registro
      });
    }

    // send all user data, except password
    const { password: _1, ...response } = user.dataValues;

    return res.send({
      msg: `Welcome ${user.name}`,
      access: true,
      token: token,
      user: response,
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "the password or email is incorrect", access: false });
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
  postUser,
  deleteUser,
  putUser,
  loginUser,
  getAllUser,
  logOut,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getCheckAdmin,

};
