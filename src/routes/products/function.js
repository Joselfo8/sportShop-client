const { Product } = require("../../db")

//post/ product to db
const postProduct = (title, price, description, product_category, product_subCategory) => {

    const promesse = new Promise(async (resolve, reject) => {
        try {
            if (!title||title.char(0)!==" "||title.length>25|| !price ||price<0|| !description || !product_category ||product_category.char(0)!==" "|| !product_subCategory ||product_subCategory.char(0)!==" ") {
                throw new Error("Missing Corrects parameters")
            } else {
                const product = await Product.create({
                    title,
                    price,
                    description,
                    product_category,
                    product_subCategory
                })
            }
            return resolve(product)
        }
        catch (e) {
            return reject(e)
        }
    })
    return promesse
}
//get product By name
const getProductByName = async (name) => {
    const Products = await getAllProducts();
    const product = Products.map((e) => e);
    const filter = product.filter((e) => e.name == name);
    return filter;
  }

  //get product By id
  const getProductById = async (id) => {
    const Products = await getAllProducts();
    const product = Products.map((e) => e);
    const filter = product.filter((e) => e.id == id);
    return filter;
}
  //get all products from db
  const getDBproducts = async () => {
    const dbProduct = await Product.findAll({ 
    })
    return dbProduct.map(e => {
        return {
            id: e.id,
            product_name: e.product_name,
            price: e.price,
            description: e.description,
            product_category: e.product_category,
            product_subCategory: e.product_subCategory
        }
    })
  }
  // post product to Shopping_cartdb related to user
  const Product_add_cart = async (req, res, next) => {
    try {
      const {
        user_id,title, price, description, product_category, product_subCategory
      } = req.body;
  
      if (!title || !price || !description|| !product_category || !product_subCategory) {
        return res.status(400).send("missing Correct parameters");
      }
      const Product_Created = await Carry.create({
        title, price, description, product_category, product_subCategory
      });
       const buyer = await User.findOne({
       where: {
         id: user_id,
       },
     });
     
     Product_Created.addUser(buyer);
      // console.log(Product_Created)
      res.status(201).send(`product ${Product_Created.title} added to the Shopping Cart`);
    } catch (err) {
      next(err);
    }
  };
  //put product to carrydb (fix on carrydb)
  const Product_fix_carry = async (req, res, next) => {
    try {
      const {
        user_id,title, price, description, product_category, product_subCategory
      } = req.body;
  
      if (!title || !price || !description|| !product_category || !product_subCategory) {
        return res.status(400).send("missing Correct parameters");
      }
      const Product_Created = await Carry.put({
        title, price, description, product_category, product_subCategory
      });
       const buyer = await User.findOne({
       where: {
         id: user_id,
       },
     });
     
     Product_Created.addUser(buyer);
      // console.log(Product_Created)
      res.status(201).send(`product ${Product_Created.title} added to the Shopping Cart`);
    } catch (err) {
      next(err);
    }
  };

  //delete product from db by product_id (by params)
  const deleteProduct = async (req, res, next) => {
    try {
      //res.send("<h1>Dog Deleted</h1>");
      const { id } = req.params;
      if (id.length > 0)
       {await Product.destroy({
        where: { id: id }
      });
      return res.status(200).send(`Product of id: ${id} has been deleted`)};
      return res.status(400).send("there is no Product with that id");
    } catch (err) {
      next(err);
    }
  };


module.exports = { postProduct, getProductByName, getProductById, getDBproducts, Product_add_cart, Product_fix_carry, deleteProduct }