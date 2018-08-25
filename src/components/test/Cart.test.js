import React from 'react';
import ReactDOM from 'react-dom';
import Cart from '../Cart';

it('renders Cart without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Cart
            cart={{Dwt5F7KAhi: {
                'id': 'Dwt5F7KAhi',
                'name': 'Amazing Pizza!',
                'price': 1000,
                'count': 1,
                'promotions': []
            }}}
            onRemoveFromCart={() => {}}
        />, div);
    ReactDOM.unmountComponentAtNode(div);
});
