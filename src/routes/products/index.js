const router = require("express").Router();
const {postProduct}=require ("./function")
//get/products?id
router.get("", (req, res) => {
    res.json({msg: req.query.id });
});

router.put("",(req,res)=>{
    res.json({msg:req.body});
})

router.post("",(req,res)=>{
    const{title,price,description,product_category,product_subCategory}= req.body
  postProduct(title,price,description,product_category,product_subCategory)
  .then((e)=>{res.send("OK")})
})

router.delete("",(req,res)=>{
    res.json({msg:req.query.id});
})

module.exports = { products: router };