const Address = require("../models/address_model")
const asyncHandler = require("express-async-handler");

// Add new address
const addAddress = asyncHandler(async (req, res) =>{
    let { userId } = req.params
    let newAds = req.body
    newAds['userId'] = userId
    try{
        await Address.create(newAds)
        res.json({message: "Address added successfully"})
    }catch(error){
        throw new Error(error)
    }
})

// Get user all address
const getUserAds = asyncHandler(async (req, res) =>{
    let { userId } = req.params
    try{
        const ads = await Address.find({userId: userId})
        res.json({
            message: "Address get successfully",
            data: ads
        })
    }catch(error){
        throw new Error(error)
    }
})

// Get one address
const getOneAds = asyncHandler(async (req, res) =>{
    let { id } = req.params
    try{
        const ads = await Address.findOne({_id: id})
        res.json({
            message: "Address get successfully",
            data: ads
        })
    }catch(error){
        throw new Error(error)
    }
})

// Update address
const updateAds = asyncHandler(async (req, res) =>{
    let { id } = req.params
    try{
        await Address.findByIdAndUpdate(id,req.body,{new: true})
        res.json({message: "Address has been updated"})
    }catch(error){
        throw new Error(error)
    }
})

// Delete address
const deleteAds = asyncHandler(async (req, res) =>{
    let { id } = req.params
    try{
        await Address.findByIdAndUpdate(id,{status: "D"},{new: true})
        res.json({message: "Address has been deleted"})
    }catch(error){
        throw new Error(error)
    }
})


module.exports = { addAddress, getUserAds, getOneAds, updateAds, deleteAds }