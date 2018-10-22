import BaseEntity from './BaseEntity';

import Order from './Order';
import Product from './Product';

export default class OrderItem extends BaseEntity {
    static get tableName() {
        return 'orderItems';
    }


    static product(orderItem) {
        return Product.findByID(orderItem.product_id)
    }

    static order(orderItem) {
        return Order.findByID(orderItem.order_id);
    }


}