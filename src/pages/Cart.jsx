import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, storecheckoutProductsInfo } from '../redux/slices/cartSlice';
import CartItem from '../components/cart/CartItem';
import { productsApi } from '../redux/api/productApi';
import Loader from '../components/commen/Loader';
import { Button } from '@mui/material';
import { motion } from "framer-motion"; // Import Framer Motion

const Cart = () => {
    const navigate = useNavigate();

    const addedCartItems = useSelector(state => state.cart.cartItems);
    const [itemsQuantity, setItemsQuantity] = React.useState([])
    const dispatch = useDispatch();

    // get the products ids and convert to numberset
    const { isLoading, isError, data: products } = productsApi.useGetAllProductsQuery()
    const cartItems = products?.filter(p => addedCartItems.includes(p._id))

    React.useEffect(() => {
        if (cartItems && cartItems.length > 0 && itemsQuantity.length < 1) {
            const itemsInfo = cartItems.map(c => {
                return {
                    itemId: c._id,
                    quantity: 1
                }
            })
            setItemsQuantity(itemsInfo)
        }
    }, [cartItems])



    if (isLoading) {
        return <div className='w-[100vw] h-[100vh]'><Loader /></div>
    }
    if (isError) {
        return <div className='w-[100vw] h-[100vw] flex items-center justify-center '>
            <div className='cursor-pointer' onClick={() => window.location.reload()}>Reload</div>
        </div>
    }

    const handleRemoveProduct = (id) => {
        // Get current cart items from cookie
        const existingCartItems = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
        const cartItems = existingCartItems ? JSON.parse(existingCartItems.split('=')[1]) : [];
        // console.log(id, cartItems)
        const itemRemoved = cartItems?.filter(item => item !== id)
        // Update cartItems in cookie
        document.cookie = `cartItems=${JSON.stringify(itemRemoved)};max-age=604800;path=/`; // Max age set to 1 week (604800 seconds)
        // update the state to see instent change
        // Navigate to cart page
        dispatch(removeFromCart(id));
    }

    const gotoCheckout = () => {
        const existingCartItems = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
        const cartItems = existingCartItems ? JSON.parse(existingCartItems.split('=')[1]) : [];
        const finalProducts = products.filter(p => cartItems.includes(p._id))
        const deliveryFree = finalProducts.reduce((acc, product) => {
            // Check if shopId already exists in the accumulator
            if (acc.hasOwnProperty(product.shopId)) {
                // If shopId exists, don't add the deliveryFee
                acc[product.shopId] += 0;
            } else {
                // If shopId doesn't exist, add the deliveryFee to the accumulator
                acc[product.shopId] = product.deliveryFee;
            }
            return acc;
        }, {});

        const totalPrice = finalProducts.reduce((total, product) => {
            // Find the corresponding item quantity object in itemsQuantety
            const itemQuantity = itemsQuantity.find(item => item.itemId === product._id);
            // If there is a corresponding item quantity, multiply price by quantity
            if (itemQuantity) {
                total += Number(product.price) * Number(itemQuantity.quantity);
            }
            return total;
        }, 0);
        // Summing up the delivery fees
        const totalDeliveryFee = Object.values(deliveryFree).reduce((total, fee) => Number(total) + Number(fee), 0);
        const ids = finalProducts.map(p => p._id)      
        const data = JSON.stringify({totalDeliveryFee, totalPrice, products: ids})
        localStorage.setItem('checkoutInfo',data)
        navigate("/checkout");

    }

    const incrementQuantity = (itemId) => {
        const updatedQuantity = itemsQuantity.map(i => {
            if (i.itemId == itemId && i.quantity < 10) {
                return {
                    ...i,
                    quantity: i.quantity + 1
                }
            }
            else {
                return i
            }
        })
        setItemsQuantity(updatedQuantity)
    }

    const decrementQuantity = (itemId) => {
        const updatedQuantity = itemsQuantity.map(i => {
            if (i.itemId == itemId && i.quantity > 1) {
                return {
                    ...i,
                    quantity: i.quantity - 1
                }
            }
            else {
                return i
            }
        })
        setItemsQuantity(updatedQuantity)
    }

    return (
        <Layout>
             <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto mt-8 min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <div className='h-72 flex items-center justify-center'>
                        <p>Your cart is empty. <Link to="/products"><strong>Continue shopping</strong></Link></p>
                    </div>
                ) : (
                    <div className='w-[100%] sm:w-[50%]'>
                        {cartItems.map((item, index) => {
                            return (
                                <CartItem
                                    item={item}
                                    handleRemoveProduct={handleRemoveProduct}
                                    key={index + item._id}
                                    incrementQuantity={incrementQuantity}
                                    decrementQuantity={decrementQuantity}
                                    setItemsQuantity={setItemsQuantity}
                                    itemsQuantity={itemsQuantity}
                                />
                            )
                        })}
                        <div className="mt-8">
                            <Button onClick={gotoCheckout} className=" normal_btn bg-blue-500 normal_btn py-2 px-4 w-fit rounded-md hover:bg-blue-600">Proceed to Checkout</Button>
                        </div>
                    </div>
                )}
            </div>
            </motion.div>
        </Layout>
    );
};

export default Cart;
