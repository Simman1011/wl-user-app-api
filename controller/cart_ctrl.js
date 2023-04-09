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
      console.log('new');
      //Add new product
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }]
      });
      await Cart.create(newCart);
      res.json({message: "Product added to cart"})
    }else{
      console.log('old');
      //Update product quantity
      const productIndex = userCart.items.findIndex(
        (product) => product.product == productId
      );
      
      if (productIndex !== -1) {
        // If product is already in cart, increase quantity by 1
        userCart.items[productIndex].quantity++;
        userCart["updatedAt"] = Date.now;
        res.json({message: "Product quantity updated"})
      } else {
        // If product is not in cart, add product with quantity of 1
        userCart.items.push({ product: new ObjectId(productId), quantity: 1 });
        res.json({message: "Product added to cart"})
      }
      
      await Cart.findOneAndUpdate(userId, userCart);
    }
  }catch(error){
    throw new Error(error)
  }
});

module.exports = { addProduct }