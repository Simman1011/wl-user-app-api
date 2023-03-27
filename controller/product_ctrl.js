const {ObjectId} = require('mongodb');
const Product = require("../models/product_model")
const asyncHandler = require("express-async-handler");

const getProductsByMainCat = asyncHandler(async (req, res) =>{
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

const getProductsBySubCat = asyncHandler(async (req, res) =>{
    let { id } = req.params
    let { limit, skip, min, max, sizes, colors, sleeve, fabric, pattern, stocks } = req.query;

    let query = {subCatId: new ObjectId(id)}

    if(min && max) query['offerPrice'] = {$gte: min, $lte: max}
    
    if(sizes) query['sizes'] = {$in: sizes.split(',')}
    
    if(colors) query['colors'] = {$in: colors.split(',')}
    
    if(sleeve) query['sleeve'] = {$in: sleeve.split(',')}

    if(fabric) query['fabric'] = {$in: fabric.split(',')}
    
    if(pattern) query['pattern'] = {$in: pattern.split(',')}
    
    if(stocks) query['stocks'] = {$gte: stocks}

    try{
        let find = await Product.find(query).limit(limit).skip(skip)
        
        res.json({
            message: "Products get successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

const getProductDetails = asyncHandler(async (req, res) =>{
    let { id } = req.params
    try{
        let find = await Product.findById(id)
        
        res.json({
            message: "Get product details successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

const getPopularProducts = asyncHandler(async (req, res) =>{
    let { limit, skip } = req.query;

    try{
        let find = await Product.find({isPopular: true}).limit(limit).skip(skip)
        
        res.json({
            message: "Get Popular products successfully",
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

module.exports = { getProductsByMainCat, getProductsBySubCat, getProductDetails, getPopularProducts, addProduct }