import React, { useState } from 'react';
import Cart from '../../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../../ReviewItem/ReviewItem';
import "./Orders.css";
import { deleteShoppingCart, removeFromDb } from '../../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const saveCart = useLoaderData();
    // console.log(cart);
    const [cart, setCart] = useState(saveCart); // saveCart is initial / default value;

    const handleRemoveFromCart = (id) => {
        console.log(id);
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    };

    const handlerClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product =>
                        <ReviewItem
                            key={product.id}
                            product={product}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />)
                }
            </div>

            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handlerClearCart={handlerClearCart}
                >
                    <Link to={"/checkout"}>
                        <button className='btn-proceed'>Proceed checkout
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;