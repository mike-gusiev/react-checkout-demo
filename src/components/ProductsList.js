import React from 'react';
import PropTypes from 'prop-types';

import {Panel, Button} from 'react-bootstrap';

const ProductsList = ({products, onAddToCart}) => {
    if (products === null) {
        return <div className="product-list">Loading...</div>;
    }
    return (
        <div className="product-list">
            <div className="product-counter">
                Total products: {products.length}
            </div>
            {products.map(item => (
                <Panel key={item.id}>
                    <Panel.Body className="product-list-container">
                        <Button bsStyle="success" onClick={() => onAddToCart(item)}>Add to Cart</Button>
                        <p className="product-name">
                            {item.name}: <span>${item.price}</span>
                        </p>
                    </Panel.Body>
                </Panel>
            ))}
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array,
    onAddToCart: PropTypes.func.isRequired
};

export default ProductsList;
