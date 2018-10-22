import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-browser-router";
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './App.css';

import Header from './components/Header/Header.js';
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import SearchPage from "./pages/SearchPage/SearchPage";


class App extends Component {

    render() {
        return (
            <div className="App">
                <ApolloProvider client={this.props.client}>
                    <div>
                        <BrowserRouter>
                            <div>
                                <Header/>
                                <div className="mainContent">
                                <Row>
                                    <Col offset={2} span={20}>
                                <Switch>
                                    <Route exact path="/" component={HomePage}/>
                                    <Route path="/category" component={CategoryPage}/>
                                    <Route path="/product" component={ProductPage}/>
                                    <Route path="/cart" component={CartPage}/>
                                    <Route path="/orders" component={OrderPage}/>
                                    <Route path="/search" component={SearchPage}/>
                                </Switch>
                                    </Col>
                                </Row>
                                </div>
                            </div>
                        </BrowserRouter>
                    </div>
                </ApolloProvider>
            </div>
        );
    }
}

export default App;
