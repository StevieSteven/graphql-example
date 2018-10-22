import BaseEntity from './BaseEntity';

import Customer from './Customer';
import OrderItem from './OrderItem';

export default class Order extends BaseEntity {
    static get tableName() {
        return 'orders';
    }


    static items (order) {
        return OrderItem.findAll({
            where: {
                order_id: order.id
            }
        })
    }

    static customer (order) {
        return Customer.findByID(order.customer_id);
    }


}