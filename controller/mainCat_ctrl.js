const MainCat = require("../models/mainCat_model")
const asyncHandler = require("express-async-handler");

const getMainCat = asyncHandler(async (req, res) =>{
    try{
        res.json({
            message: "Main Category get successfully",
            data: await MainCat.find()
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getMainCat }