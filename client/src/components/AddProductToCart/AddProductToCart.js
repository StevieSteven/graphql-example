import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {Input, Button, Select, notification} from 'antd';


const InputGroup = Input.Group;

class AddProductToCart extends React.Component {


    state = {
        numberOfProducts: 1
    };


    render() {

        const selectHandler = (value) => {
            this.setState({
                numberOfProducts: value
            })
        };

        const handleCartBtn = () => {
            this.props.mutate({
                variables: {
                    uuid: this.props.product.uuid,
                    quantity: this.state.numberOfProducts
                },
                refetchQueries: ['CartQuery']
            }).then(({data}) => {
                notification["success"]({
                    message: 'Warenkorb',
                    description: `${this.state.numberOfProducts} ${this.props.product.name} wurde in den Warenkorb geschoben.`,
                });

            }).catch((error) => {
                console.log('there was an error sending the query', error);
                notification['error']({
                    message: 'Produkt konnte nicht in den Warenkorb gelegt werden.',
                    description: error.message,
                });
            });
        };

        return (
            <InputGroup compact>
                <Select onChange={selectHandler} defaultValue={1}>
                    <Select.Option value={1}>1 </Select.Option>
                    <Select.Option value={2}>2 </Select.Option>
                    <Select.Option value={3}>3 </Select.Option>
                    <Select.Option value={4}>4 </Select.Option>
                    <Select.Option value={5}>5 </Select.Option>
                </Select>
                <Button type="primary" onClick={handleCartBtn}>In den Warenkorb legen</Button>

            </InputGroup>


        );

    };
}

const addProfuctToCartQuery = gql`    
    mutation AddProductToCart($uuid: ID!, $quantity: Int!) {
        addProductToCart(uuid: $uuid, quantity: $quantity) {
            uuid
        }
    }
`;

export default graphql(addProfuctToCartQuery, {
    options:
        (vars) => ({
            notifyOnNetworkStatusChange: true
        })


})(AddProductToCart);