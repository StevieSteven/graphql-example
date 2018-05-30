import React from 'react';

import {Row, Col} from 'antd';


export default ({element}) => {
    if (!element.product) {
        console.log(element);
        return (<div>Fehler bei Produkt</div>);
    }

    return <Row>
        <Col span={16}>
            {/*{JSON.stringify(element)}*/}
            <h3>{element.product.name}</h3>
            <p><b>Preis: </b>{element.product.price} € pro Stück</p>
            <p><b>Beschreibung: </b>{element.product.description}</p>

        </Col>
        <Col offset={1} span={7}>
            <Row>
                <Col span={24}><b>{element.quantity} Stück</b> für</Col>
                <Col span={24}><b>{element.quantity * element.product.price} €</b></Col>
            </Row>
        </Col>
        {/*{JSON.stringify(element)}*/}
    </Row>
}