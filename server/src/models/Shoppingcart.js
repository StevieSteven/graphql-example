import BaseEntity from './BaseEntity';

import Customer from './Customer';
import ShoppingcartElement from './ShoppingcartElement';

export default class Order extends BaseEntity {
    static get tableName() {
        return 'shoppingcarts';
    }


    static elements (cart) {
        return ShoppingcartElement.findAll({
            where: {
                cart_id: cart.id
            }
        })
    }

    static customer (cart) {
        return Customer.findByID(cart.customer_id);
    }


    static addElement (cart, element) {
        return ShoppingcartElement.findAll({
            where: {
                card_id: cart.id
            }
        })
    }

}