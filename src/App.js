import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Grid, Row, Col} from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ProductsList, Cart, TotalPrice} from './components';
import {api} from './api';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            cart: {}
        };
    }

    componentDidMount() {
        this.getProductsList();
    }

    getProductsList = () => {
        api.getProducts().then(products => this.setState({ products }));
    }

    getProductPromotion = (id) => {
        api.getPromotions(id).then(data => {
            this.setState({
                cart: {
                    ...this.state.cart,
                    [id]: {
                        ...this.state.cart[id],
                        promotions: data.promotions
                    }
                }
            });
        });
    }

    handleAddToCart = (item) => {
        let product = this.state.cart[item.id];
        if (product) {
            product.count++;
        } else {
            product = { ...item, count: 1 };
            this.getProductPromotion(item.id);
        }
        this.setState({
            cart: {
                ...this.state.cart,
                [item.id]: product
            }
        });
    }

    handlerRemoveFromCart = (key) => {
        let newCart = { ...this.state.cart };
        if (newCart[key].count-- === 1) delete newCart[key];
        this.setState({
              cart: newCart
        });
    }

    handleCheckout = () => {
        toast.success('Checkout successful!', {
            position: 'top-right'
        });
        this.setState({
            cart: {}
        });
    }

    render() {
        return (
            <Grid fluid>
                <Row className="row header">
                    <Col xs={12}>
                        <img src={logo} className="logo" alt="logo" />
                        <h1 className="title">Welcome to React Checkout Demo</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        <ProductsList products={this.state.products} onAddToCart={this.handleAddToCart}/>
                    </Col>
                    <Col xs={4}>
                        <Cart cart={this.state.cart} onRemoveFromCart={this.handlerRemoveFromCart}/>
                        <TotalPrice cart={this.state.cart} onCheckout={this.handleCheckout}/>
                        <ToastContainer />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

App.propTypes = {};
