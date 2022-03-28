import React, {useRef, useEffect, useState, useCallback} from 'react';
import { observer } from "mobx-react-lite";
import Product from './Product';
import {ProductApi} from './../api';
import {Modal, Button, Form, Spinner} from 'react-bootstrap';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';

const Products = observer(({ products }) => {
    const scollableRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [maxPage, setMaxPage] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const fetchProduct =  () => {
        setLoading(true);
        ProductApi.getAllProduct(page).then((data)=>{
            if(data && data.products && data.products.length){
                products.addProducts(data.products);
                if(data.totalPage && maxPage < data.totalPage) setMaxPage(data.totalPage);
            }
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        });
    }

    const onScroll = useCallback(() => {
        if (scollableRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scollableRef.current;
            if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && page < maxPage && !loading) {
                setLoading(true);
                setTimeout(()=>{
                    setPage(page+1);
                },1500)
            }
        }
    },[page, maxPage, loading]);

    useEffect(()=>{
        fetchProduct();
    }, [page])

    useEffect(() => {
        const div = scollableRef.current;
        div.addEventListener("scroll", onScroll);
        return ()=>{
            div.removeEventListener("scroll", onScroll);
        }
    },[onScroll])

    const showEditModal = (product)=>{
        products.updateCurrent(product);
        setEditModalVisible(true);
    }
    const hideEditModal = ()=>{
        setEditModalVisible(false);
    }
    const submitEdit = (data) => {
        setLoading(true);
        ProductApi.editProduct(data).then((data)=>{
            if(data && data.status){
                products.editProduct(data.data);
                hideEditModal();
                setErrorMessage(null);
            } else{
                setErrorMessage(data.error)
            }
            setLoading(false);
        });
    }

    const showCreateModal = (product)=>{
        products.updateCurrent(product);
        setCreateModalVisible(true);
    }
    const hideCreateModal = ()=>{
        setCreateModalVisible(false);
    }
    const submitCreate = (data) => {
        setLoading(true);
        ProductApi.addProduct(data).then((data)=>{
            if(data && data.status){
                products.addProduct(data.data);
                hideCreateModal();
                setErrorMessage(null);
            } else{
                setErrorMessage(data.error)
            }
            setLoading(false);
        });
    }

    const showDeleteModal = (product)=>{
        products.updateCurrent(product);
        setDeleteModalVisible(true);
    }
    const hideDeleteModal = ()=>{
        setDeleteModalVisible(false);
    }
    const submitDelete = (id) => {
        setLoading(true);
        ProductApi.delProduct(id).then((data)=>{
            if(data && data.status){
                products.delProduct(id);
                hideDeleteModal();
                setErrorMessage(null);
            } else{
                setErrorMessage(data.error)
            }
            setLoading(false);
        });
    }

    return (
        <div className="products">
            <div style={{ padding: '1rem', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between', display: 'flex', width: '100%',}}>
                <div>
                    <p>
                        <strong>Total</strong>: <em>{products.collection.length}</em>
                        <br />
                    </p>
                </div>
                <div>
                    <Button variant="success" onClick={showCreateModal}>
                        Add
                    </Button>
                </div>
            </div>
            <div ref={scollableRef} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', width: '100vw', height: '90vh', overflowY: 'auto'}}>
                {products.collection && products.collection.map(p => (
                <Product
                    key={'product-'+p.id}
                    product={p}
                    showEditModal={()=>{
                        showEditModal(p)
                    }}
                    showDeleteModal={()=>{
                        showDeleteModal(p)
                    }}
                />
                ))}
            </div>
            <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                {
                    loading &&
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
            </div>
            <EditProduct errorMessage={errorMessage} hideError={()=>setErrorMessage(null)} loading={loading} product={products.currentProduct} visible={editModalVisible} hide={hideEditModal} onSubmit={submitEdit}/>
            <AddProduct errorMessage={errorMessage} hideError={()=>setErrorMessage(null)} loading={loading} visible={createModalVisible} hide={hideCreateModal} onSubmit={submitCreate}/>
            <DeleteProduct errorMessage={errorMessage} hideError={()=>setErrorMessage(null)} loading={loading} product={products.currentProduct} visible={deleteModalVisible} hide={hideDeleteModal} onSubmit={submitDelete}/>
        </div>
    )
});

export default Products;
