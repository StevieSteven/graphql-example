import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {withRouter} from 'react-router-dom'

import {Divider} from 'antd';

import Loading from "../../components/Loading/Loading";

import styles from './CategoryPage.scss'
import ProductContainer from "../../components/ProductContainer/ProductContainer";

const CategoryPage = withRouter(({data, history}) => {

    const productClickGenerator = (item) => {
        return () => {
            history.push({pathname: "/product", search: `?id=${item.uuid}`, state: {product: item}})
        }
    };

    if (data.loading) {
        return <Loading/>
    }

    if (!data.category) {
        return <div>Keine Kategorie mit dieser ID vorhanden.</div>
    }

    return (
        <div>
            <h1>{data.category.name}
                <small>{data.category.numberOfProducts} Produkte verfügbar</small>
            </h1>

            <div className={styles.productGutter}>

                {data.category.products.map((item, index) =>
                    <div className={styles.productLine} key={index} onClick={productClickGenerator(item)}>
                        <ProductContainer key={index} product={item}/><Divider/></div>)}

            </div>
        </div>
    )
        ;

});

const categoryQuery = gql`
    query CategoryQuery($uuid: ID!) {
        category(uuid: $uuid) {
            uuid
            name
            numberOfProducts
            products {
                uuid
                name
                price
                description
            }
        }
    }
`;

export default graphql(categoryQuery, {
    options: (vars) => ({
        variables: {uuid: vars.location.state.category.uuid},
        // notifyOnNetworkStatusChange: true

    })

})(CategoryPage);