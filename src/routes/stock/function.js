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
            { where: { item_id, size } }
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

//get/stock_item?=id&size
const getStock = async (req, res) => {
    try {
        let { item_id, size } = req.query;
        if (!item_id) return res.send({ msg: "please, item_id is required" });
        if (!size) return res.send({ msg: "please, size is required" });

        const stock = await Stock.findOne({
            where: {
                item_id: item_id,
                size: size
            }
        })
        if (!stock) {
            return res.send({ msg: "stock not found" });
        }
        return res.status(200).send({ stock });
    }
    catch (error) {
        console.log("error", error);
        //res.send(error.errors[0].message)
        res.send(error)
    }
}

async function getAllSize(item_id){
    try {
        
        if (!item_id) return { msg: "please, item_id is required" }
//console.log(item_id)
        const stock = await Stock.findAll({
            where: {
                item_id: item_id
            }
        })
       // console.log(stock.map((e)=>e.dataValues))
        
        if (!stock) {
            return { msg: "stock not found" }
        }
        return  stock.map((e)=>e.dataValues);
    }
    catch (error) {
        console.log("error", error);
        return (error)

    }
}
//getAllSize(2)
//get/stock_item?=id
const getStockById = async (req, res) => {
    let { item_id } = req.query;

    try {
        if (!item_id) return res.send({ msg: "please, item_id is required" });

        const stock = await Stock.findAll({
            where: {
                item_id: item_id
            }
        })
        if (!stock) {
            return res.send({ msg: "stock not found" });
        }
        return res.status(200).send({ stock });
    }
    catch (error) {
        console.log("error", error);
        //res.send(error.errors[0].message)
        res.send(error)
    }
}
//delete/stock_item?=id
const deleteStock = async (req, res) => {
    try {
        let { item_id } = req.params;
        console.log(item_id)
        if(!item_id) return res.send({ msg: "please, item_id is required" });
        const stock = await Stock.findOne({ where: { item_id: item_id }})
        if (!stock) {
            return res.send({ msg: "stock not found" });
        } 
        Stock.destroy({
            where: { item_id: item_id },
          })
        //await stock.destroy();
        return res.status(200).send({ msg: "stock deleted" });
    }
    catch (error) {
        console.log("error", error);
        res.send(error)
    }
}

module.exports = {
    addStock, getStock, getStockById, deleteStock, getAllSize
}   