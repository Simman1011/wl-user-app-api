const {ObjectId} = require('mongodb');
const Product = require("../models/product_model")
const asyncHandler = require("express-async-handler");

const getProductByMainCat = asyncHandler(async (req, res) =>{
    let { id } = req.params
    let { limit, skip } = req.query;
    try{
        let find = await Product.find({mainCatId: new ObjectId(id)}).limit(limit).skip(skip)
        
        res.json({
            message: "Products get successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

const getProductBySubCat = asyncHandler(async (req, res) =>{
    let { id } = req.params
    let { limit, skip } = req.query;
    try{
        let find = await Product.find({subCatId: new ObjectId(id)}).limit(limit).skip(skip)
        
        res.json({
            message: "Products get successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

const addProduct = asyncHandler(async (req, res) =>{
    let newProduct = req.body;
    await Product.create(newProduct)
    res.json({message: "Product Create successfully"})
})

module.exports = { getProductByMainCat, getProductBySubCat, addProduct }