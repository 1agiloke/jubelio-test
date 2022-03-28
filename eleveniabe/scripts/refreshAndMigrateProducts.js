const query = require('./../queries');
const productApi = require('./../services/product_api');

run = async () => {

    let page = 1;
    let maxPage = 100; //set to falsy value to remove maxpage restriction;
    let products = [];
    let productRes;
    do{
        productRes = await productApi.getAllProducts(page)
        if(productRes && productRes.length){
            productRes = productRes.filter((pr, index, self)=>{
                return self.findIndex((prs)=>{
                    return pr.sku.toLowerCase() === prs.sku.toLowerCase();
                }) === index;
            });
            productRes = productRes.filter((pr)=>{
                return !products.find((p)=>{
                    return pr.sku.toLowerCase()==p.sku.toLowerCase();
                });
            });
            products = products.concat(productRes);
        }
        console.log({page, count: products.length});
        page++;
    }while(productRes && productRes.length && (!maxPage || page < maxPage));
    query.productQuery.refreshAndMigrate(products);
}

run();