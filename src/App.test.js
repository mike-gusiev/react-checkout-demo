import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {shallow, configure} from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let wrapper;
let fakeGetProductsList;
let fakeGetProductPromotion;

beforeAll(() => {
    fakeGetProductsList = sinon.stub(App.prototype, 'getProductsList');
    fakeGetProductPromotion = sinon.stub(App.prototype, 'getProductPromotion');
});

beforeEach(() => {
    wrapper = shallow(<App/>);
    expect(wrapper.state('cart')).toEqual({});
});

afterEach(() => {
    fakeGetProductsList.reset();
    fakeGetProductPromotion.reset();
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should add same products to cart state', () => {
    wrapper.instance().handleAddToCart({id: 'id', name: 'myName', price: 100});
    expect(wrapper.state('cart')).toEqual({'id': {'count': 1, 'id': 'id', 'name': 'myName', 'price': 100}});

    wrapper.instance().handleAddToCart({id: 'id', name: 'myName', price: 100});
    expect(wrapper.state('cart').id.count).toEqual(2);
});

it('should add different products to cart state', () => {
    wrapper.instance().handleAddToCart({id: 'id', name: 'myName', price: 100});
    wrapper.instance().handleAddToCart({id: 'newId', name: 'newMyName', price: 1000});

    expect(wrapper.state('cart')).toEqual({
        'id': {'count': 1, 'id': 'id', 'name': 'myName', 'price': 100},
        'newId': {'count': 1, 'id': 'newId', 'name': 'newMyName', 'price': 1000}
    });
});

it('should add product to card and remove it', () => {
    wrapper.instance().handleAddToCart({id: 'id', name: 'myName', price: 100});
    wrapper.instance().handlerRemoveFromCart('id');

    expect(wrapper.state('cart')).toEqual({});
});
