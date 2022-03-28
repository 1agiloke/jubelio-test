import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';

const AddProduct = ({ errorMessage, hideError, loading, visible, hide, onSubmit }) => {
    
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const submit = useCallback(()=>{
        onSubmit({name, description, price, image, sku });
    }, [name, description, price, image, sku]);

    useEffect(()=>{
        if(!visible){
            setName('');
            setSku('');
            setPrice(0);
            setDescription('');
            setImage(null);
        }
    }, [visible])

    return (
        <Modal size='xl' show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Item</Modal.Title>
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
                    <Form.Control placeholder="Name" defaultValue={name} onChange={(event) => {
                        setName(event.target.value)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>SKU</Form.Label>
                    <Form.Control placeholder="SKU" defaultValue={sku} onChange={(event) => {
                        setSku(event.target.value)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" placeholder="Image File" onChange={(event) => {
                        setImage(event.target.files[0])
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price in IDR" defaultValue={price} onChange={(event) => {
                        setPrice(parseInt(event.target.value))
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Description" defaultValue={description} onChange={(event) => {
                        setDescription(event.target.value)
                    }} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>
                    Close
                </Button>
                <Button disabled={loading} variant="primary" onClick={submit}>
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
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddProduct;