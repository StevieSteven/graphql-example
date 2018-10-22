import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {withRouter} from 'react-router-dom'

import {Divider} from 'antd';

import Loading from "../../components/Loading/Loading";

import styles from './CartPage.scss'
import CartElement from "../../components/CartElement/CartElement";

const CategoryPage = withRouter(({data, history}) => {

    const productClickGenerator = (item) => {
        return () => {
            history.push({pathname: "/product", search: `?id=${item.product.uuid}`, state: {product: item.product}})
        }
    };

    if (data.loading) {
        return <Loading/>
    }

    if (!data.cart) {
        return <div>Ihr Einkaufswagen ist leer.</div>
    }

    return (
        <div>
            <h1>Mein Warenkorb
                <small> ({data.cart.items.length} Produkte)</small>
            </h1>

            <div className={styles.productGutter}>

                <Divider/>
                {data.cart.items.map((item, index) =>
                    <div className={styles.productLine} key={index} onClick={productClickGenerator(item)}>
                        <CartElement key={index} element={item}/>
                        <Divider/>
                    </div>)}

            </div>
        </div>
    );

});

const categoryQuery = gql`
    query CartQuery {
        cart: shoppingcart {
            items {
                quantity
                product {
                    uuid
                    name
                    description
                    price
                }
                
            }
        }
    }
`;

export default graphql(categoryQuery)(CategoryPage);