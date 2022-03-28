import { action, computed } from 'mobx';

export const ProductActions = products => ({
  addProducts: action(newProducts => {
    products.collection = products.collection.concat(newProducts);
  }),
  addProduct: action(product => {
    products.collection.unshift(product);
  }),
  delProduct: action(id => {
    products.collection = products.collection.filter(t => {
      return t.id !== id;
    });
  }),
  saveProduct: action(() => {
    products.addProduct(products.currentProduct);
    products.currentProduct = {};
  }),
  editProduct: action((product) => {
    let idx = products.collection.findIndex((p)=>product.id===p.id)
    if(idx>=0){
      products.collection[idx] = product;
      products.currentProduct = {};
    }
  }),
  updateCurrent: action(currentProduct => {
    products.currentProduct = currentProduct;
  })
});
