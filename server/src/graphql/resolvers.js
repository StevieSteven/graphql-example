import uuid from 'uuid/v4';

import Generator from './../dummyData/Generator';

import Product from './../models/Product';
import Category from './../models/Category';
import Customer from './../models/Customer';
import Rating from './../models/Rating';
import Order from './../models/Order';
import OrderItem from './../models/OrderItem';
import Shoppingcart from './../models/Shoppingcart';
import ShoppingcartElement from './../models/ShoppingcartElement';

import OrderStatus from './../models/OrderStatus';

import {database} from "./../models/BaseEntity";


const createDummyData = () => {
    Generator.categories();
    Generator.products();
    Generator.customers();
    Generator.ratings();
    Generator.orders();
    Generator.shoppingcart();
};


createDummyData();

let loggedInCustomer = Customer.findOne();

console.log("loggedInCustomer: ", loggedInCustomer);


const resolveFunctions = {
    Query: {
        category(_, {uuid}) {
            let cat = Category.findByUUID(uuid);
            if (cat) {
                cat.numberOfProducts = Category.products(cat).length;
                return cat;
            }
            return null;
        },
        categories(root, {startsWith}) {
            let categories;
            if (startsWith && startsWith.trim().length > 0) {
                categories = Category.findAll({
                    startsWith: {
                        name: startsWith
                    }
                });
            } else {
                categories = Category.findAll();
            }

            categories.forEach(cat => {
                cat.numberOfProducts = Category.products(cat).length;
            });

            return categories;
        },
        products(root, {startsWith}) {
            if (startsWith && startsWith.trim().length > 0) {
                return Product.findAll({
                    startsWith: {
                        name: startsWith
                    }
                });
            }
            return Product.findAll();
        },
        me(_) {
            return loggedInCustomer;
        },
        shoppingcart(_) {
            return Customer.shoppingcart(loggedInCustomer);
        },

        orders(_) {
            return Customer.orders(loggedInCustomer);
        },
        product(_, {uuid}) {
            return Product.findByUUID(uuid);
        },
    },
    Mutation: {
        addProductToCart: (root, args) => {
            let cart =Customer.shoppingcart(loggedInCustomer);
            let product = Product.findByUUID(args.uuid);

            ShoppingcartElement.create({
                uuid: uuid(),
                cart_id: cart.id,
                product_id: product.id,
                quantity: args.quantity
            });
             return cart;
         },
    },
    Category: {
        products: {
            resolve(root) {
                return Category.products(root);
            }
        },
    },
    Product: {
        ratings: {
            resolve(root) {
                return Product.ratings(root);
            }
        },
        category: {
            resolve(root) {
                return Product.category(root);
            }
        }
    },
    Rating: {
        product: {
            resolve(root) {
                return Rating.product(root);
            }
        },
        customer: {
            resolve(root) {
                return Rating.customer(root);
            }
        }
    },
    Customer: {
        shoppingcart: {
            resolve(root) {
                return Customer.shoppingcart(root);
            }
        },
        orders: {
            resolve(root) {
                return Customer.orders(root);
            }
        },
        ratings: {
            resolve(root) {
                return Customer.ratings(root);
            }
        }
    },
    Shoppingcart: {
        items: {
            resolve(root) {
                return Shoppingcart.elements(root);
            }
        },
    },
    ShoppingcartElement: {
        product: {
            resolve(root) {
                return ShoppingcartElement.product(root);
            }
        },
    },
    Order: {
        items: {
            resolve(root) {
                return Order.items(root);
            }
        },
        status: {
            resolve(root) {
                return root.orderStatus;
            }
        }
    },
    OrderItem: {
        product: {
            resolve(root) {
                return OrderItem.product(root);
            }
        },
    },
};

export default resolveFunctions;