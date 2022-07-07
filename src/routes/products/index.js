const router = require("express").Router();
const {postProduct, getProductByName, getProductById, getDBproducts, Product_fix_carry, deleteProduct,putProduct}=require ("./function")
//get/products?name
router.get("",getProductByName)
//get/products db
router.get("/all",getDBproducts)

//get/products/:id
router.get("/:id",getProductById) 
/* router.put("",(req,res)=>{
    res.json({msg:req.body});
}) */
//put fix product_database 
router.put("/",putProduct)
//post/products a productDB
router.post("",postProduct)
//delete/products/id delete product by id from productDB
router.delete("/:id",deleteProduct);  
module.exports = { products: router };