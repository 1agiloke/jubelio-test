exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/products',
        handler: (request, h) => {
            return 'PRODUCT';
        }
    });
  
    server.route({
        method: 'POST',
        path: '/products',
        handler: controller.createCoin()
    });

    server.route({
        method: 'PUT',
        path: '/products',
        handler: controller.createCoin()
    });
  
    next();
};