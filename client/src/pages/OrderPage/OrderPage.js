import React from 'react';

import {Alert} from 'antd';

// const OrderPage = ({data}) => {
const OrderPage = () => {


    return (
        <div>
            <h1>Ihre Bestellungen </h1>


            <Alert message="TODOS" description="GraphQL Query und Anzeigen von Daten fehlen noch." type="info" />

        </div>
    );

};

export default OrderPage;
/*
 * ... wird später ersetzt durch:
 */

// const orderQuery = gql`
//     query OrderQuery {
//         #todo
//     }
// `;
//
// export default graphql(orderQuery)(OrderPage);
