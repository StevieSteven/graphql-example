import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {withRouter} from 'react-router-dom'

import {Link} from 'react-router-dom';

const CustomerNavigation = ({data}) => {
    let numberOfProducts = 0;
    if(data && data.cart) {
        numberOfProducts = data.cart.items.length;
    }

    return (
        <div>
            <Link to="cart" className="large-text">Mein Warenkorb {numberOfProducts && `(${numberOfProducts})`}</Link>
            <Link to="orders" className="large-text">Meine Bestellungen</Link>
        </div>
    )
};


const cartQuery = gql`
    query CartQuery {
        cart: shoppingcart {
            items {
                quantity
            }
        }
    }
`;

export default graphql(cartQuery)(withRouter(CustomerNavigation));
