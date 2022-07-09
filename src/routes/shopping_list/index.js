const router = require("express").Router();

const {get_item, /*put_item,*/ delete_item,destroy_trolly, add_item }= require("./function")

router.get("", get_item);

router.post("",add_item);

router.delete("", delete_item);

router.delete("/all",destroy_trolly);





module.exports = { shopping_list: router }