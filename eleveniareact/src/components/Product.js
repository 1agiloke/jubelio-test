import React from "react";
import { observer } from "mobx-react-lite";
import {Card, Button, Col} from 'react-bootstrap';

const transformImageUrl = (url)=>{
  if(url.indexOf("http://") == 0 || url.indexOf("https://") == 0){
    return url;
  }
  return `${process.env.REACT_APP_API_ROOT_URL}/${url}`;
}

const Product = ({ product, showEditModal, showDeleteModal }) => (
  <Col sm={12} lg={3}>
    <Card className='product' style={{ margin: '0 20px', display: 'inline-flex', maxHeight: '450px', marginBottom: '2em' }}>
      <Card.Img variant="top" style={{height: '100%', objectFit: 'cover'}} src={transformImageUrl(product.image)}/>
      <Card.Body>
        <Card.Title style={{height: '48px', overflowY: 'hidden'}}>{product.name}</Card.Title>
        <Card.Text style={{maxHeight: '100px', overflowY: 'hidden'}}>
          {product.description}
        </Card.Text>
        <Card.Footer style={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
          <div>
            <span>IDR {product.price}</span>
          </div>
          <div>
            <Button variant="primary" onClick={showEditModal}>Edit</Button>
            <Button variant="danger" onClick={showDeleteModal}>Delete</Button>
          </div>
        </Card.Footer>
      </Card.Body>
    </Card>
  </Col>
);

export default observer(Product);
