import React from 'react';
import PropTypes from 'prop-types';

import {Table, Glyphicon} from 'react-bootstrap';

const Cart = ({cart, onRemoveFromCart}) => {
    const cartCount = Object.keys(cart).reduce((prev, id) => prev + cart[id].count, 0);
    return (
        <div className="product-list">
            <div className="product-counter">
                Your cart has {cartCount} product{cartCount % 10 !== 1 ? 's' : ''}!
            </div>
            <div className="product-cart">
                <Table striped bordered condensed hover>
                    <tbody>
                        {Object.keys(cart).map((key, index) => (
                            <tr key={index}>
                                <td>{cart[key].name}
                                    <Glyphicon glyph="remove" onClick={() => onRemoveFromCart(key)}/>
                                </td>
                                <td>{cart[key].count}</td>
                                <td>${cart[key].count * cart[key].price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.object.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired
};

export default Cart;
