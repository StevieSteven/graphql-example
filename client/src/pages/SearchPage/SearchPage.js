import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {withRouter} from 'react-router-dom'

import {Row, Col} from 'antd'
import Loading from "../../components/Loading/Loading";
import ProductContainer from "../../components/ProductContainer/ProductContainer";

// import RatingContainer from "../../components/RatingContainer/RatingContainer";

const SearchPage = withRouter(({data, history}) => {

    const productClickGenerator = (item) => {
        return () => {
            history.push({pathname: "/product", search: `?id=${item.uuid}`, state: {product: item}})
        }
    };

    if (data.loading) {
        return <Loading/>
    }

    if (!data.products) {
        return <div>Keine Produkte mit dieser ID vorhanden.</div>
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <h1>Suchergebnis: <small>{data.products.length} Produkte gefunden</small></h1>
                </Col>
            </Row>


            <Row>

                {data.products.map((item, index) =>
                    <Col  key={index} onClick={productClickGenerator(item)}>
                        <ProductContainer key={index} product={item}/></Col>)}

            </Row>

        </div>
    )
        ;

});

const productsQuery = gql`
    query ProductsQuery($startsWith: String) {
        products(startsWith: $startsWith) {
            uuid
            name
            price
            description
        }
    }
`;

export default graphql(productsQuery, {
    options: (vars) => {
        console.log("vars bei SearchPage: ", vars);
        return ({
            variables: {startsWith: vars.location.state.query},
            // notifyOnNetworkStatusChange: true

        })
    }
})(SearchPage);