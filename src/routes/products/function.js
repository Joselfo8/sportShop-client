const { Product } = require("../../db")

const postProduct = (title, price, description, product_category, product_subCategory) => {

    const promesse = new Promise(async (resolve, reject) => {
        try {
            const product = await Product.create({
                title,
                price,
                description,
                product_category,
                product_subCategory
            })
            return resolve(product)
        }
        catch (e){
            return reject(e)
        }
})
    return promesse
}
module.exports = { postProduct }