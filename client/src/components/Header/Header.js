import React, {Component} from 'react';

import {Row, Col, Icon} from 'antd';

import {Link} from 'react-router-dom'

import SearchBar from './../SearchBar/SearchBar';

import './Header.css';
import CustomerNavigation from "../CustomerNavigation/CustomerNavigation";

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Row>
                    <Col span={1}>
                        <div className="text-element large-text">
                            <Link to="/"><Icon type="home" size="large"/></Link>
                        </div>
                    </Col>
                    <Col span={6}>
                        <SearchBar/>
                    </Col>
                    <Col offset={1} span={16}>
                        <div className="text-element">
                            <CustomerNavigation/>
                        </div>
                    </Col>
                </Row>

            </header>

        );
    }
}
