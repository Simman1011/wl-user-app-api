const initializeRoutes = (app) => {
    app.use('/api/v1/user', require('./v1/auth_route'));
    app.use('/api/v1/address', require('./v1/address_route'));
    app.use('/api/v1/category', require('./v1/category_route'));
    app.use('/api/v1/product', require('./v1/product_route'));
    app.use('/api/v1/wishlist', require('./v1/wishlist_route'));
};

module.exports = initializeRoutes;