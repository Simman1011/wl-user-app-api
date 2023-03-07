const MainCat = require("../models/mainCatModel")
const asyncHandler = require("express-async-handler");

// Add new address
const getMainCat = asyncHandler(async (req, res) =>{
    try{
        const mainCat = await MainCat.find()
        res.json({
            message: "Main Category get successfully",
            data: mainCat
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getMainCat }