import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {withRouter} from 'react-router-dom'

import {Row, Col} from 'antd'

import Loading from "../Loading/Loading";
import CategoryContainer from "../CategoryContainer/CategoryContainer";

import './CategoryOverview.css'

const CategoryOverview = withRouter(({data, history}) => {

    const categoryClickGenerator = (item) => {

        return () => {
            history.push({pathname:"/category", search: `?id=${item.uuid}`, state: {category: item}})
        }
    };

    if (data.loading) {
        return <Loading/>
    }

    return (
        <div className="categoryGutter">
            <Row gutter={16}>
                {data.categories.map((item, index) => {
                    return <Col span={6} key={index} onClick={categoryClickGenerator(item)}>
                        <div className="gutterBox">
                            <CategoryContainer categoryId={item.uuid}/>
                        </div>
                    </Col>
                })
                }
            </Row>
        </div>
    )
        ;

});

const categoriesQuery = gql`
    query CategoriesQuery {
        categories {
            uuid
        }
    }
`;

export default graphql(categoriesQuery)(CategoryOverview);