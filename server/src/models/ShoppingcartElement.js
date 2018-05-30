import BaseEntity from './BaseEntity';

import Shoppingcard from './Shoppingcart';
import Product from './Product';

export default class ShoppingcardElement extends BaseEntity {
    static get tableName() {
        return 'shoppingcardElements';
    }


    static product(element) {
        return Product.findByID(element.product_id)
    }

    static shoppingcard(element) {
        return Shoppingcard.findByID(element.card_id);
    }


}