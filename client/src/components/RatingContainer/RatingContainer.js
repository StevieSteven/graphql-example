import React from 'react';

import {Divider} from 'antd';
import ReactStars from 'react-stars';


export default ({rating}) => {
    return (
        <div>
            <div>
                <ReactStars
                    count={5}
                    value={rating.stars}
                    size={24}
                    edit={false}
                    color2={'#ffd700'}/>
                <p>von {rating.customer.firstName} {rating.customer.surname}</p>
            </div>
            <br/>
            {rating.comment}
            <Divider/>
        </div>
    );
};