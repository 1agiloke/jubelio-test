import React, {Component} from "react";
import { observer } from "mobx-react-lite";
import ProductList from "./components/ProductList";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

/*
 * App or the main component used can then pass any store
 * it wants to it's children
 */
const App = (props) => {
  return (
    <ProductList products={props.stores.products} />
  );
}

export default observer(App);
