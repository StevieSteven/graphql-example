import React from 'react';

import {withRouter} from 'react-router-dom'
import {Input} from 'antd';

const Search = Input.Search;


export default withRouter(({history}) => {
    const searchHandler = (value) => {
        history.push({
            pathname:"/search",
            search: `?query=${value}`,
            state: {query: value}
        })
    };

    return <div>    <Search
        placeholder="nach Produkten suchen"
        enterButton="Suche"
        size="large"
        onSearch={searchHandler}
    /></div>
});