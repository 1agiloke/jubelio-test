import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';

const DeleteProduct = ({ errorMessage, hideError, loading, visible, hide, product, onSubmit }) => {
    
    const [name, setName] = useState(product.name);
    const [sku, setSku] = useState(product.sku);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState(null);

    const submit = useCallback(()=>{
        console.log({id: product.id});
        onSubmit(product.id);
    }, [name, description, price, image, sku])

    useEffect(()=>{
        setName(product.name);
        setSku(product.sku)
        setDescription(product.description);
        setPrice(product.price);
    }, [product])

    return (
        <Modal size='xl' show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure want to delete following item?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    errorMessage ? 
                    <Alert variant="danger" onClose={hideError} dismissible>
                        <Alert.Heading>Aw! Something went wrong!</Alert.Heading>
                        <p>{errorMessage}</p>
                    </Alert>
                    : null
                }
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control disabled placeholder="Name" defaultValue={product.name} onChange={(event) => {
                        setName(event.target.value)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>SKU</Form.Label>
                    <Form.Control disabled placeholder="SKU" defaultValue={product.sku} onChange={(event) => {
                        setSku(event.target.value)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" disabled placeholder="Price in IDR" defaultValue={product.price} onChange={(event) => {
                        setPrice(parseInt(event.target.value))
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" disabled placeholder="Description" defaultValue={product.description} onChange={(event) => {
                        setDescription(event.target.value)
                    }} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>
                    Close
                </Button>
                <Button disabled={loading} variant="danger" onClick={submit}>
                    {
                        loading &&
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    }
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteProduct;