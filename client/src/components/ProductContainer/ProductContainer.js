import React from 'react';

import {Row, Col} from 'antd';


export default ({product}) => {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <h3>{product.name}</h3>
                </Col>
            </Row>
            <Row>
                <Col offset={1} span={22}>
                    <p><b>Preis: </b>{product.price} € pro Stück</p>
                    <p><b>Beschreibung: </b>{product.description}</p>
                </Col>
            </Row>
        </div>);
};