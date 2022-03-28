const axios = require('axios');
const xmljs = require('xml-js');
const baseUrl = 'http://api.elevenia.co.id/rest';
const getAllProducts = (page) => {
    return axios.get(`${baseUrl}/prodservices/product/listing?page=${page}`, {
        headers: {
            openapikey: '721407f393e84a28593374cc2b347a98'
        }
    }).then((res)=>{
        const resData = xmljs.xml2js(res.data, {compact: true});
        if(resData && resData.Products && resData.Products.product && resData.Products.product.length){
            const products = resData.Products.product.filter(p=>p.sellerPrdCd && p.sellerPrdCd._text).map((p)=>{
                return {
                    name: p.prdNm._text,
                    sku: p.sellerPrdCd._text,
                    price: parseInt(p.selPrc._text),
                    description: p.htmlDetail || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image: p.prdImage01 || 'https://via.placeholder.com/1600x900',
                }
            });
            return products;
        } 
        return [];
    }).catch((err)=>{
        console.log({err});
        return null;
    });
}

module.exports = {
    getAllProducts
}