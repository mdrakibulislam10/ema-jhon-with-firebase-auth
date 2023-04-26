import React from 'react';
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({ cart, handlerClearCart, children }) => {
    // const cart = props.cart; // dot notation
    // const { cart } = props; // destructuring
    // console.log(cart);

    // total price
    let totalPrice = 0;
    // shipping Charge
    let totalShipping = 0;
    // quantity
    let quantity = 0;
    for (const product of cart) {
        // if (!product.quantity) {
        //     product.quantity = 1;
        // }
        // condition shortcut
        // product.quantity = product.quantity || 1; // 0 is falsy;

        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    };
    // tax amount
    const tax = totalPrice * 7 / 100;
    // grand total
    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <h3 style={{ textAlign: "center" }}>Order Summary</h3>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
            <div className='btn-parent'>
                {/* we can do it - () => handlerClearCart() */}
                <button onClick={handlerClearCart} className='btn-clear-cart'>Clear Cart
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>

                {children}

            </div>
        </div>
    );
};

export default Cart;