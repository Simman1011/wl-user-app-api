const Review = require("../models/review_model")
const asyncHandler = require("express-async-handler");

const getReview = asyncHandler(async (req, res) =>{
    let { limit, skip } = req.query;
    let { product, order } = req.body;

    let query = {status: 'Y'}

    if(product) query['product'] = {$in: product}
    
    if(order) query['order'] = {$in: order}

    try{
        let find = await Review.find(query).limit(limit).skip(skip)

        res.json({
            message: "Review(s) get successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

const addEditReview = asyncHandler(async (req, res) =>{
    let review = req.body;
    let { id } = req.params;

    try{
        if (id) {
            await Review.findByIdAndUpdate(id,review,{new: true})
            res.json({message: "Review has been updated"})
        }else{
            await Review.create(review)
            res.json({message: "Your review was added"})
        }
    }catch(error){
        throw new Error(error)
    }
})

const deleteReview = asyncHandler(async (req, res) =>{
    let { id } = req.params;

    try{
        await Review.findByIdAndUpdate(id,{status: 'D'},{new: true})
        res.json({message: "Review has been removed"})
    }catch(error){
        throw new Error(error)
    }
})


module.exports = { getReview, addEditReview, deleteReview }