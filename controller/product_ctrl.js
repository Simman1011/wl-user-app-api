const SubCat = require("../models/subCat_model")
const asyncHandler = require("express-async-handler");

const getSubCat = asyncHandler(async (req, res) =>{
    try{
        res.json({
            message: "Sub Category get successfully",
            data: await SubCat.find()
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getSubCat }