import { extendObservable } from 'mobx';
import ProductModels from '../models/Product';
import { ProductActions } from '../actions/Product';

class ProductStore {
  constructor() {
    extendObservable(this, {
      ...ProductModels(),
      ...ProductActions(this)
    });
  }
}

export default new ProductStore();
