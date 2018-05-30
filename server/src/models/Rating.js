import BaseEntity from './BaseEntity';

import Product from './Product';
import Customer from './Customer';

export default class Rating extends BaseEntity {
    static get tableName() {
        return 'ratings';
    }


    static product (rating) {
        console.log("categoryID: ",rating);

        return Product.findByID(rating.product_id)
    }

    static customer (rating) {
        return Customer.findByID(rating.customer_id);
    }

}