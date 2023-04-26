import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("products.json")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    // retrieve / back / get data(product) from local storage
    useEffect(() => {
        // console.log(products);
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step 1: get id
        for (const id in storedCart) {
            // step 2: get the product by using id
            const addedProduct = products.find(product => product.id === id)
            // step 3: add quantity
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                saveCart.push(addedProduct);
            }
            // console.log(addedProduct);
            // step 5: set the cart
            setCart(saveCart);
            // console.log(saveCart);
        }
    }, [products]); // get products after finished load data

    // event handler
    const handleAddToCart = (product) => {
        console.log(product);
        // cart.push(product); // don't do this
        let newCart = [];

        // const newCart = [...cart, product];

        // if product doesn't exists in the cart, then set quantity = 1;
        // if exists then, update quantity by 1; previous quantity + 1;

        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id)
            newCart = [...remaining, exists];
        }

        setCart(newCart);

        // set data to local storage
        addToDb(product.id);
    };

    const handlerClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };

    return (
        <div className="shop-container">
            <div>
                {/* <h2>Products coming here!!! {products.length}</h2> */}
                <div className='product-container'>
                    {
                        products.map(product => <Product
                            product={product}
                            key={product.id}
                            handleAddToCart={handleAddToCart} // we can pass any function
                        ></Product>)
                    }
                </div>
            </div>

            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handlerClearCart={handlerClearCart}
                >
                    <Link to={"/orders"}>
                        <button className='btn-proceed'>Review Order
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </Link>
                    {/* <p>another</p> */}
                </Cart>
            </div>
        </div>
    );
};

export default Shop;