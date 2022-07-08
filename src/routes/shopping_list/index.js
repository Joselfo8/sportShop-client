const router = require("express").Router();

const {getItemByUser, putItem, deleteItem }=require("./function")

router.get("/:id", getItemByUser);

router.put("/", putItem);

router.delete("/", deleteItem);



module.exports = { shopping_list: router }