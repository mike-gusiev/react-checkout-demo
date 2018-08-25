import React from 'react';
import ReactDOM from 'react-dom';
import TotalPrice, {getDiscount} from '../TotalPrice';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders TotalPrice without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <TotalPrice onCheckout={() => {}} cart={{ Dwt5F7KAhi: {
            'id': 'any',
            'name': 'anyName',
            'price': 1000,
            'count': 1,
            'promotions': []
            }}}
        />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('should return proper discount for FLAT_PERCENT', () => {
    expect(getDiscount({
        'id': 'any',
        'name': 'anyName',
        'price': 1000,
        'count': 2,
        'promotions': [
            {
                'id': 'Gm1piPn7Fg',
                'type': 'FLAT_PERCENT',
                'amount': 50
            }
        ]
    })).toBe(1000);
});

test('should return proper discount for QTY_BASED_PRICE_OVERRIDE', () => {
    expect(getDiscount({
        'id': 'any',
        'name': 'anyName',
        'price': 1000,
        'count': 2,
        'promotions': [
            {
                'id': 'ibt3EEYczW',
                'type': 'QTY_BASED_PRICE_OVERRIDE',
                'required_qty': 2,
                'price': 1800
            }
        ]
    })).toBe(200);
});

test('should return proper discount for BUY_X_GET_Y_FREE', () => {
    expect(getDiscount({
        'id': 'any',
        'name': 'anyName',
        'price': 1000,
        'count': 6,
        'promotions': [
            {
                'id': 'ZRAwbsO2qM',
                'type': 'BUY_X_GET_Y_FREE',
                'required_qty': 2,
                'free_qty': 1
            }
        ]
    })).toBe(2000);
});

test('should return proper discount without promotions', () => {
    expect(getDiscount({
        'id': 'any',
        'name': 'anyName',
        'price': 200,
        'count': 10,
        'promotions': []
    })).toBe(0);
});
