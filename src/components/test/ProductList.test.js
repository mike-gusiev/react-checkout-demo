import React from 'react';
import ReactDOM from 'react-dom';
import ProductsList from '../ProductsList';

it('renders ProductsList without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ProductsList
            products={[{
                'id': 'Dwt5F7KAhi',
                'name': 'Amazing Pizza!',
                'price': 1100
            }]}
            onAddToCart={() => {}}
        />, div);
    ReactDOM.unmountComponentAtNode(div);
});
