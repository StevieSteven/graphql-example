import BaseEntity from './BaseEntity';

import Rating from './Rating'
import Category from './Category';

export default class Product extends BaseEntity {
    static get tableName() {
        return 'products';
    }

    static ratings(product) {
        return Rating.findAll({
            where: {
                product_id: product.id
            }
        })
    }

    static category(product) {
        return Category.findByID(product.category_id);
    }
}