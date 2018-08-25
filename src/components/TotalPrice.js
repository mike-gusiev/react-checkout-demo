import React from 'react';
import PropTypes from 'prop-types';

import {Table, Button} from 'react-bootstrap';

export const getDiscount = (item) => {
    let discount = 0;
    if (item.promotions && item.promotions.length) {
        const promotion = item.promotions[0];
        switch (promotion.type) {
            case 'FLAT_PERCENT':
                discount = item.count * item.price * promotion.amount * 0.01;
                break;
            case 'QTY_BASED_PRICE_OVERRIDE':
                let specialPrice = promotion.price;
                let specialCount = Math.floor(item.count / promotion['required_qty']);
                discount = item.price * item.count - specialPrice * specialCount
                    - item.count % promotion['required_qty'] * item.price;
                break;
            case 'BUY_X_GET_Y_FREE':
                let generalQty = promotion['required_qty'] + promotion['free_qty'];
                discount = Math.floor(item.count / generalQty) * item.price;
                break;
            default:
        }
    }
    return +discount.toFixed(2);
};

const TotalPrice = ({cart, onCheckout}) => {

    const totalPrice = Object.keys(cart).reduce(
        (prev, id) => prev + cart[id].count * cart[id].price, 0
    );
    if (totalPrice === 0)  return null;

    const totalDiscount = Object.keys(cart).reduce(
        (prev, id) => prev + getDiscount(cart[id]), 0
    );

    return (
        <div className="product-list-container">
            <div className="product-counter">
                Total:
            </div>
            <Table  striped bordered condensed hover>
                <tbody>
                <tr>
                    <td>Regular price:</td>
                    <td>${totalPrice}</td>
                </tr>
                <tr>
                    <td>Your discount:</td>
                    <td>${totalDiscount}</td>
                </tr>
                <tr>
                    <td>Total price:</td>
                    <td>${totalPrice - totalDiscount}</td>
                </tr>
                </tbody>
            </Table>
            <Button bsStyle="success" onClick={onCheckout}>Checkout</Button>
        </div>
    );
};

TotalPrice.propTypes = {
    cart: PropTypes.object.isRequired,
    onCheckout: PropTypes.func.isRequired
};

export default TotalPrice;
