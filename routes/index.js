const initializeRoutes = (app) => {
    app.use('/api/v1/user', require('./v1/authRoute'));
    app.use('/api/v1/address', require('./v1/addressRoute'));
    app.use('/api/v1/mainCat', require('./v1/mainCatRoute'));
};

module.exports = initializeRoutes;