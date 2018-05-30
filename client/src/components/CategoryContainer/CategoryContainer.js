import React from 'react';

import {Collapse} from 'antd';

const Panel = Collapse.Panel;

export default ({category}) => {
    return (
        <Collapse defaultActiveKey={['1']}>
            <Panel header={category.name} key="1">
                <p>{category.numberOfProducts} verfügbar</p>
            </Panel>
        </Collapse>);
};