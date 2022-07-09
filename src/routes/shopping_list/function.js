const { User, Shopping_list, Product } = require("../../db")

const get_item = async (req, res) => {
    try {
        const { user_id } = req.query
        const user = await User.findOne({ where: { id: user_id } });
        //console.log(user.dataValues);
        const list = await user.getShopping_list()
        const products = await list.getProducts()
        const productos=products.map((e) => {
            return {
                productId: e.id,
                title: e.title,
                price: e.price,
                image: e.image,
                shoppingListId: e.user_shopping.shoppingListId,
                
            }
        })
        res.send(productos)
        
    }

    catch (e) {
        console.log(e);
    }
}

// resivo id del item a borrar
const delete_item = async (req, res) => {
    try {
        const { product_id } = req.query;
        const { user_id } = req.query;
        let user = await User.findOne({ where: { id: user_id } })
        const list = await user.getShopping_list();
        const product_to_delete = await Product.findOne({where:{id:product_id}}) 
        const new_list =  await list.removeProduct(product_to_delete)
        res.status(201).send("product removed successfully"); 
    }
    catch (e) {
        res.send(e);
    }
}

const destroy_trolly = async(req,res)=>{
    try{
    const {user_id}= req.query
    const user = await User.findOne({where:{id:user_id}});
    const trolly = await user.getShopping_list()
    await trolly.setProducts([])
    res.status(201).send('the trolly has ben descarted')
    }
    catch(e){
        res.send(e);
    }

}


const add_item = async (req, res) => {
    //res.send("<h1>put putItem<h1>");
    const { user_id } = req.query;
    const { product_id } = req.query;
    try {
        const user = await User.findOne({ where: { id: user_id } });
        const item_to_add = await Product.findOne({ where: { id: product_id } });
        const list = await user.getShopping_list();
        //console.log(list);
        await list.addProduct(item_to_add)
        const new_list = await list.getProducts();
        const final_list=new_list.map((e) => {
            return {
                productId: e.id,
                title: e.title,
                price: e.price,
                image: e.image,
                shoppingListId: e.user_shopping.shoppingListId,
                
            }
        })
        res.send(final_list)
    }
    catch (e) {
        console.log(e);
    }

}

module.exports = {  get_item, delete_item,destroy_trolly, add_item };