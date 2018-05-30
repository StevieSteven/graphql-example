import uuid from 'uuid/v4';

import faker from 'faker';

import Product from './../models/Product';
import Category from './../models/Category';
import Customer from './../models/Customer';
import Rating from './../models/Rating';
import Order from './../models/Order';
import OrderItem from './../models/OrderItem';
import OrderStatus, {orderKeys} from "../models/OrderStatus";
import Shoppingcart from './../models/Shoppingcart'
import ShoppingcartElement from './../models/ShoppingcartElement'


const CATEGORY_NAMES = ["Technik", "Bücher", "Filme", "Haushalt"];

const NUMBER_OF_PRODUCTS_PER_CATEGORY = 5;
const NUMBER_OF_CUSTOMERS = 50;
const NUMBER_OF_MAX_RATINGS = 10;

const NUMBER_OF_ORDERS = 10;
const NUMBER_OF_ORDERELEMENT_PER_ORDER = 5;
const NUMBER_OF_SHOPPINGCARTELEMENTS = 5;


class Generator {

    static categories () {
        CATEGORY_NAMES.forEach(name => {
            Category.create({
                name,
                uuid: uuid()
            })
        })
    }

    static products () {

        let categories = Category.findAll();
        categories.forEach(category => {
            for(let index = 0; index < NUMBER_OF_PRODUCTS_PER_CATEGORY; index++) {
                Product.create({
                    uuid: uuid(),
                    category_id: category.id,
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    description: faker.lorem.paragraph()
                });
            }
        })
    }

    static customers () {
        for(let index = 0; index < NUMBER_OF_CUSTOMERS; index++) {
            Customer.create({
                uuid: uuid(),
                firstName: faker.name.firstName(),
                surname: faker.name.lastName()
            })
        }
    }

    static ratings () {
        Product.findAll().forEach(product => {
            for(let index = 0; index< faker.random.number(NUMBER_OF_MAX_RATINGS); index++) {
                Rating.create({
                    uuid: uuid(),
                    stars: faker.random.number(4)+1,
                    comment: faker.lorem.paragraph(),
                    product_id: product.id,
                    customer_id: faker.random.number(NUMBER_OF_CUSTOMERS - 1) + 1
                })
            }
        })
    }


    static orders () {
        let products = Product.findAll();

        Customer.findAll().forEach(customer => {
            for (let index = 0; index < NUMBER_OF_ORDERS; index++) {
                let order = Order.create({
                    uuid: uuid(),
                    customer_id: customer.id,
                    orderStatus: orderKeys[faker.random.number(orderKeys.length - 1)],
                    date: faker.date.past()
                });

                for (let itemIndex = 0; itemIndex < NUMBER_OF_ORDERELEMENT_PER_ORDER; itemIndex++) {
                    let product = products[faker.random.number(products.length - 1)];


                    OrderItem.create({
                        uuid: uuid(),
                        order_id: order.id,
                        product_id: product.id,
                        quantity: faker.random.number(4) + 1
                    })
                }
            }
        });
    }

    static shoppingcart () {
        let customer = Customer.findOne();
        let products = Product.findAll();

        let cart = Shoppingcart.create({
            uuid: uuid(),
            customer_id: customer.id
        });

        for(let index = 0; index < NUMBER_OF_SHOPPINGCARTELEMENTS; index++) {
            let product = products[faker.random.number(products.length - 1)];

            ShoppingcartElement.create({
                uuid: uuid(),
                cart_id: cart.id,
                product_id: product.id,
                quantity: faker.random.number(4) + 1
            })
        }
    }

}


export default Generator;