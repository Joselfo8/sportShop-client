const { User, Shopping_list } = require("../../db")

const getItemByUser = async (req, res) => {
    try {
        const {id} = req.params;
        //res.send("<h1>get getItemByUser<h1>"+id);
       const user = await User.findOne({where: {id}});
        //console.log(user);
         if(!user){
             return res.status(404).json({msg:"User not found"});}
             //return res.status(200).json(user.dataValues);
       const Items = await Shopping_list.findAll({          
                    where: { userId: id },     
        })
        console.log(Items);
        return res.status(200).json(Items);
        /* const from_db = Items.map((e) => {
            return {
                id: e.id,
                title: e.title,
                price: e.price,
                description: e.description,
                product_category: e.product_category,
                product_subCategory: e.product_subCategory,
                product_care: e.product_care,
                image: e.image,
            };
        }); */ 


    }
    catch (e) {
        console.log(e);
    }
}

const putItem = async (req, res) => {
    res.send("<h1>put putItem<h1>");
}
const deleteItem = async (req, res) => {
    res.send("<h1>delete deleteItem<h1>");
}

module.exports = { getItemByUser, putItem, deleteItem };