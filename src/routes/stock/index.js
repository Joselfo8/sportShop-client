
const router = require("express").Router();
const { modifiedStock } = require("./function");

//post/stock_item body:id,size
router.post("", modifiedStock);
//get/stock_item?id


module.exports = { stock: router };

