import BaseEntity from './BaseEntity';

import Order from './Order';
import Rating from './Rating';
import Shoppingcart from './../models/Shoppingcart';

export default class Customer extends BaseEntity {
    static get tableName() {
        return 'customers';
    }

    static orders(customer) {
        return Order.findAll({
            where: {
                customer_id: customer.id
            }
        });
    }

    static ratings(customer) {
        return Rating.findAll({
            where: {
                customer_id: customer.id
            }
        });
    }

    static shoppingcart(customer) {
        return Shoppingcart.findOne({
            where: {
                customer_id: customer.id
            }
        });
    }
}