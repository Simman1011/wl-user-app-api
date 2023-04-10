const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart_model")
const {ObjectId} = require('mongodb');

const addProduct = asyncHandler(async (req, res) => {
  const productId = req.body.productId;
  const userId = req.body.userId;
  try {
    // Check if cart already exists for user
    let userCart = await Cart.findOne({ user: userId })
    if (!userCart) {
      //Add new product
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }]
      });
      await Cart.create(newCart);
      res.json({message: "Product added to cart"})
    }else{
      //Update product quantity
      const productIndex = userCart.items.findIndex(
        (product) => product.product == productId
      );
      
      if (productIndex !== -1) {
        userCart.items[productIndex].quantity++;
        // userCart.items[productIndex].updatedAt = Date.now;
        // console.log(userCart);
        await Cart.findOneAndUpdate(userId, userCart);
        res.json({message: "Product quantity updated"});
      } else {
        userCart.items.push({ product: new ObjectId(productId), quantity: 1 });
        await Cart.findOneAndUpdate(userId, userCart);
        res.json({message: "Product added to cart"});
      }
    }
  }catch(error){
    throw new Error(error)
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  const productId = req.body.productId;
  const userId = req.body.userId;
  const quantity = req.body.quantity;
  try {
    let userCart = await Cart.findOne({ user: userId })
      //Update product quantity
      const productIndex = userCart.items.findIndex(
        (product) => product.product == productId
      );
      
      if (quantity) {
        if (userCart.items[productIndex].quantity !== 1) {
          userCart.items[productIndex].quantity--;
          // userCart.items[productIndex].updatedAt = Date.now;
          await Cart.findOneAndUpdate(userId, userCart);
          res.json({message: "Product quantity updated"}); 
        }else{
          userCart.items.splice(productIndex, 1)
          await Cart.findOneAndUpdate(userId, userCart);
          res.json({message: "Product removed from cart"});
        }
      }else {
        userCart.items.splice(productIndex, 1)
        await Cart.findOneAndUpdate(userId, userCart);
        res.json({message: "Product removed from cart"});
      }
  }catch(error){
    throw new Error(error)
  }
});

module.exports = { addProduct, removeProduct }