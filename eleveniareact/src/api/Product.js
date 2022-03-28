import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_ROOT_URL;

const getAllProduct = (page) => {
    console.log({BASE_URL});
    return axios.get(BASE_URL+`/products/${page}`).then((res)=>{
        console.log({res});
        return res.data;
    }).catch((err)=>{
        return null;
    })
}

const addProduct = ({name, description, image, price, sku}) => {
    const data = {
        name, description, image, price, sku
    };
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    return axios.post(BASE_URL+`/product`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
        return res.data;
    }).catch((err)=>{
        return null;
    })
}

const editProduct = ({id, name, description, image, price, sku}) => {
    const data = {
        name, description, image, price, sku
    };
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    return axios.put(BASE_URL+`/product/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
        return res.data;
    }).catch((err)=>{
        return null;
    })
}

const delProduct = (id) => {
    return axios.delete(BASE_URL+`/product/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{
        return null;
    })
}

export default {
    getAllProduct,
    addProduct,
    editProduct,
    delProduct,
}