const SubCat = require("../models/subCat_model")
const asyncHandler = require("express-async-handler");

const getSubCat = asyncHandler(async (req, res) =>{
    let { id } = req.query;
    let { limit, skip } = req.query;
    try{
        let find = await SubCat.find({mainCatId: id}).limit(limit).skip(skip)
        res.json({
            message: "Sub Category get successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getSubCat }