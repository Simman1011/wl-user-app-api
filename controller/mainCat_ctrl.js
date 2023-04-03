const MainCat = require("../models/mainCat_model")
const asyncHandler = require("express-async-handler");

const getMainCat = asyncHandler(async (req, res) =>{
    let { limit, skip } = req.query;
    try{
        let find = await MainCat.find().limit(limit).skip(skip)

        res.json({
            message: "Main Category get successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getMainCat }