import BaseEntity from './BaseEntity';

import Product from './Product';

export default class Category extends BaseEntity {
    static get tableName() {
        return 'categories';
    }


    static products (category) {
        return Product.findAll({
            where: {
                category_id: category.id
            }
        })
    }

}