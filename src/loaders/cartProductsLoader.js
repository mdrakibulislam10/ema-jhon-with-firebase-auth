import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch("products.json"); // loadedProducts = res
    const products = await loadedProducts.json(); // products = data

    // if cart data is in database, you have to use async await
    const storedCart = getShoppingCart();
    console.log(storedCart);
    const saveCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
        }
        saveCart.push(addedProduct);
    }

    // console.log(products);

    // if you need to send two things(value)
    // return [products, saveCart]; // call and get value with destructuring;
    // another option
    // return { products, saveCart };
    // return { products, cart: saveCart };

    return saveCart;
};

// export { cartProductsLoader };
export default cartProductsLoader;