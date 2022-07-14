const router = require("express").Router();
const {
    addStock, stock_item_id }= require("./function");

//get/stock_item?id&size

//post/stock_item body:id,size
router.post("", addStock);

//get/stock_item?=id&size
router.get("",stock_item_id );
//delete/stock_item/:id


module.exports = { stock: router };