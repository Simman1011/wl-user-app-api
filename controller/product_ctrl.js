const Product = require("../models/product_model")
const asyncHandler = require("express-async-handler");

const getProductBySubCat = asyncHandler(async (req, res) =>{
    let { id } = req.params
    let { limit, skip } = req.query;
    try{
        let find = await Product.find({subCatId: id, $limit: 100})
        
        res.json({
            message: "Products get successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getProductBySubCat }