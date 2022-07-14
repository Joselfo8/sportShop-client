require("dotenv").config();
const { Stock } = require("../../db");
const { Product } = require("../../db");
const { Op } = require("sequelize");

const addStock = async (req, res) => {
    try {
        let { item_id, size, quantity } = req.body;
        if (!item_id) return res.send({ msg: "please, item_id is required" });
        if (!size) return res.send({ msg: "please, size is required" });
        if (!quantity) return res.send({ msg: "please, quantity is required" });
        const validItem = await Product.findOne({
            where: {
                id: item_id
            }
        })
        if (!validItem) {
            return res.send({ msg: "item id must be from a product Item" });
        }
        //create stock
        let actualNumber = await Stock.findOne(
            { where: { item_id: item_id } }
        )
        console.log(parseInt(quantity));
        //actualNumber.quantity? actualNumber.quantity += parseInt(quantity): actualNumber.quantity = parseInt(quantity);
        if (actualNumber) {
            actualNumber.quantity += parseInt(quantity);
            await actualNumber.save();
        }
        else {
            await Stock.create({
                item_id,
                size,
                quantity
            })
        }
        return res.status(201).send({ msg: "stock added" });
    }
    catch (error) {
        console.log("error", error);
        //res.send(error.errors[0].message)
        res.send(error)
    }
}
const stock_item_id = async (res,req) => {
    let { item_id, size } = req.query;
try{
        //validamos que el stock exista
        const stock = await Stock.findOne({ where: { item_id: item_id } });
        if (!stock) {
            return res.status(404).send({ msg: "stock not found" });
            }
            res.status(200).send(stock);
        //validamos que el stock tenga el size
        const stockSize = await Stock.findOne({ where: { item_id: item_id, size: size } });
        if (!stockSize) {
            return res.status(404).send({ msg: "stock not found" });
            }
            return res.status(200).send(stockSize);
        }
        
    catch(error){
        res.status(400).send({ msg: "error" });
    }
}
//recordar pintar en verde

module.exports = {
    addStock, stock_item_id
}