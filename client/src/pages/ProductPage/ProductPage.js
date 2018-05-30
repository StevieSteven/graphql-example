import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {withRouter} from 'react-router-dom'

import {Row, Col, Card} from 'antd';
import Loading from "../../components/Loading/Loading";

import styles from './ProductPage.css'
import RatingContainer from "../../components/RatingContainer/RatingContainer";
import AddProductToCart from "../../components/AddProductToCart/AddProductToCart";


const ProductPage = ({data}) => {
    if (data.loading) {
        return <Loading/>
    }

    if (!data.product) {
        return <div>Kein Produkt mit dieser ID vorhanden.</div>
    }

    return (
        <div>
            <Row>
                <Col span={8}>
                    <h1>{data.product.name}</h1>
                </Col>
                <Col gutter={12} span={5} className="right buttons">
                    <AddProductToCart
                        product={data.product}
                    />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Card title={"Allgemeine Informationen"}>
                        <span><b style={styles.legend}>Preis: </b>{data.product.price}€</span><br/>
                        <span><b className="legend">Beschreibung: </b>{data.product.description}</span>
                    </Card>
                </Col>
            </Row><br/>

            <div className={styles.productGutter}>
                <Card title={"Andere Nutzer sagen"}>
                    {data.product.ratings.map((item, index) =>
                        <RatingContainer key={index} rating={item}/>)}
                </Card>
            </div>
        </div>
    )
        ;

};


const productQuery = gql`
    query ProductQuery($uuid: ID!) {
        product(uuid: $uuid) {
            uuid
            name
            price
            description
            ratings {
                stars
                comment
                customer {
                    firstName
                    surname
                }
            }
        }
    }
`;

export default graphql(productQuery, {
    options:
        (vars) => ({
            variables: {
                uuid: vars.location.state.product.uuid
            },
            notifyOnNetworkStatusChange: true

        })

})(withRouter(ProductPage));