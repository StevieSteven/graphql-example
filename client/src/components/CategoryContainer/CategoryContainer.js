import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Collapse} from 'antd';

import Loading from "../Loading/Loading";

const Panel = Collapse.Panel;

const Container = ({data}) => {

    if (data.loading) {
        return <Loading/>
    }

    const category = data.category;

    return (
        <Collapse defaultActiveKey={['1']}>
            <Panel header={category.name} key="1">
                <p>{category.numberOfProducts} verfügbar</p>
            </Panel>
        </Collapse>);
};

const categoriesQuery = gql`
    query CategoriesQuery($id: ID!) {
        category(uuid: $id) {
            uuid
            name
            numberOfProducts
        }
    }
`;

export default graphql(categoriesQuery, {
    options: (vars) => {
        return ({
            variables: {id: vars.categoryId},
        })
    }
})(Container);