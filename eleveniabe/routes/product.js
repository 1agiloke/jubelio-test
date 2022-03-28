const {productQuery} = require('./../queries');
const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const BASE_URL = 'http://localhost:3000'; // should implement dotenv


const handleFileUpload = (image, filename) => {
    return new Promise((resolve, reject) => {
        const path = __dirname + '/../' + filename;
        const pathResized = __dirname + '/../resized_' + filename
        const file = fs.createWriteStream(path);

        file.on('error', (err) => {
            console.log(err);
            resolve(false);
        });

        image.pipe(file);

        image.on('end', (err) => { 
            if(err){
                console.log(err);
                resolve(false);
            };
            const ret = {
                headers: image.hapi.headers,
                filename,
            }
            resolve(ret);

        })
    })
}

module.exports = (server) => {
    server.route({
        method: 'GET',
        path: '/products/{page?}',
        options: {
            auth: 'my_jwt_strategy'
        },
        handler: async (request, h) => {
            const page = request.params.page || request.query.page || 1;
            let products = await productQuery.getAllProducts(page);
            products = products.map((p)=>{
                if(p.image.indexOf('https://')!==0 && p.image.indexOf('http://')!==0){
                    p.image = `${BASE_URL}/${p.image}`;
                }
                return p;
            })
            let count = await productQuery.getAllCount();
            return {
                total: count,
                totalPage: Math.ceil(count/10),
                products,
            };
        }
    });

    server.route({
        method: 'GET',
        path: '/product/{id}',
        options: {
            auth: 'my_jwt_strategy'
        },
        handler: (request, h) => {
            console.log(request, h)
            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/product',
        options: {
            auth: 'my_jwt_strategy',
            payload: {
                parse: true,
                output: 'stream',
                allow: ['multipart/form-data'],
                multipart: true
            }
        },
        handler: async (request, h) => {
            const {payload} = request;
            const {name, price, sku, description, image} = payload;
            const existSku = await productQuery.getSingleProductBySku(sku);
            if(existSku){
                return {
                    status: false,
                    error: 'SKU already exists',
                }
            }
            let data = {
                name, 
                description, 
                sku,
                price: parseInt(price),
                image: 'https://via.placeholder.com/1600x900'
            };

            if(image && image.hapi){
                const timestamp = (new Date()).getTime();
                const uploadFolder = 'uploads';
                const filename = `${uploadFolder}/${timestamp}_${image.hapi.filename.replace(/[\s]/g,'_')}`;

                const uploadRes = await handleFileUpload(image, filename);
                if(uploadRes){
                    data.image = filename;
                } else {
                    return {
                        status: false,
                        error: 'Failed upload image',
                    }
                }
            }

            const newProduct = await productQuery.createProduct(data);
            if(newProduct!==true){
                return {
                    status: false,
                    error: newProduct.message
                };
            }
            if(data.image.indexOf('https://')!==0 && data.image.indexOf('http://')!==0){
                data.image = `${BASE_URL}/${data.image}`;
            }
            return {
                status: true,
                data,
            };
        }
    });

    server.route({
        method: 'PUT',
        path: '/product/{id}',
        options: {
            auth: 'my_jwt_strategy',
            payload: {
                parse: true,
                output: 'stream',
                allow: ['multipart/form-data'],
                multipart: true
            }
        },
        handler: async (request, h) => {
            const id = parseInt(request.params.id);
            const {payload} = request;
            const {name, price, description, image, sku} = payload;
            const product = await productQuery.getSingleProduct(id);
            if(!product){
                return {
                    status: false,
                    error: 'Product not found',
                }
            }
            const existSku = await productQuery.getSingleProductBySku(sku);
            if(existSku && existSku.id!==id){
                return {
                    status: false,
                    error: 'SKU already exists',
                }
            }
            let data = {
                id,
                name, 
                description,
                sku: sku,
                price: parseInt(price),
                image: product.image,
            };
            if(image && image.hapi){
                const timestamp = (new Date()).getTime();
                const uploadFolder = 'uploads';
                const filename = `${uploadFolder}/${timestamp}_${image.hapi.filename.replace(/[\s]/g,'_')}`;
                
                const uploadRes = await handleFileUpload(image, filename);
                if(uploadRes){
                    data.image = filename;
                } else {
                    return {
                        status: false,
                        error: 'Failed upload image',
                    }
                }
            }
            const newProduct = await productQuery.updateProduct(data);
            if(newProduct!==true){
                return {
                    status: false,
                    error: newProduct.message
                };
            }
            if(data.image.indexOf('https://')!==0 && data.image.indexOf('http://')!==0){
                data.image = `${BASE_URL}/${data.image}`;
            }
            return {
                status: true,
                data,
            };
        }
    });

    server.route({
        method: 'DELETE',
        path: '/product/{id}',
        options: {
            auth: 'my_jwt_strategy',
        },
        handler: async (request, h) => {
            const id = parseInt(request.params.id);
            const product = await productQuery.getSingleProduct(id);
            if(!product){
                return {
                    status: false,
                    error: 'Product not found',
                }
            }
            const deleteProduct = await productQuery.deleteProduct(id);
            console.log({deleteProduct});
            if(deleteProduct!==true){
                return {
                    status: false,
                    error: deleteProduct.message
                };
            }
            return {
                status: true
            };
        }
    });

    return server;
}