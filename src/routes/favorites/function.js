const {User, Product } = require ('../../db')

const getFavoritesById = async (req, res) => {
    const userId = req.params.id
    const user = await User.findOne({where:{id: userId}})
    const list = await user.getFavorite()
    const products = await list.getProducts()
//    console.log(list.countProducts)
    res.send(products)
}

const addToFavorites = async (req, res) => {
    const userId = req.query.user
    const productId = req.query.product
    const user = await User.findOne({ where: {id: userId} })
    const product = await Product.findOne({ where: {id: productId} })
    const list = await user.getFavorite()
    await list.addProduct(product)
    const products = await list.getProducts()
    res.send({products})
}

const deleteById = async (req, res) => {
    const userId = req.query.user
    const productId = req.query.product
    const user = await User.findOne({where: {id: userId}})
    const product = await Product.findOne({where: {id: productId} })
    const list = await user.getFavorite()
    await list.removeProduct(product)
    const newlist = await list.getProducts()
    res.send(newlist)
}


module.exports = {
    getFavoritesById,
    addToFavorites,
    deleteById
  };
