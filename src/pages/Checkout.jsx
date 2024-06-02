import React, { useState } from 'react';
import products from '../data/products.json';
import Layout from '../components/layouts/Layout';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DiscountAndPayment from '../components/checkout/DiscoundAndPayment';
import { productsApi } from '../redux/api/productApi';
import Loader from '../components/commen/Loader';
import { Button, Grid, TextField, Typography } from '@mui/material';

const Checkout = ({ cartItems }) => {
    const [itemsToBuy, setItemsToBuy] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
    });
    const [pickFromStore, setPickFromStore] = React.useState(false)
    const itemsInCart = useSelector(state => state.cart.cartItems);
    const checkoutInfo = JSON.parse(localStorage.getItem('checkoutInfo'));

    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (location.search) {
            const productId = location.search.split('=')[1]
            setItemsToBuy([productId])
            // only buy the clicked item not in the cart ones
            return;
        }
        if (itemsInCart.length > 0) {
            setItemsToBuy(itemsInCart)
        }
    }, [location.search, itemsInCart])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pickFromStore) {
            // to close the pick from store modal option
            setPickFromStore(false);
            return;
        }
        // save order data in redux srore;
        // go to payment
        // go to paymentif the product has to be delivered to home
        sessionStorage.setItem('getProduct', "deliver")
        localStorage.setItem('addressInfo', JSON.stringify(formData))
        navigate('/payment')
        // Handle form submission, e.g., send data to server
    };
    const handlePickSubmit = (e) => {
        e.preventDefault();
        // save order data in redux srore;
        // go to paymentif the product has to be picked up from shop
        // to inform payment page 
        sessionStorage.setItem('getProduct', "pickFromShop")
        navigate('/payment')
        // Handle form submission, e.g., send data to server
    };

    const handleRemoveProduct = (productId) => {
        // Handle removing product from cart
    };

    // Get product details for products in cart
    const { data: finalProducts, isLoading, isError } = productsApi.useGetProductsDetailListMutation({
        productIds: itemsToBuy,
    });

    const handlePickFromShop = (e) => {
        setPickFromStore(e.target.checked)
    }
    return (
        <Layout>
            <div className="container mx-auto mt-8">
                {
                    isLoading ?
                        <Loader /> :
                        <>
                            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                            <DiscountAndPayment checkoutInfo={checkoutInfo || {}} />
                            <br />
                            <h2>Enter Address info below or select pick from shop</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            name="name"
                                            label="Name"
                                            variant="outlined"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    fullWidth
                                    id="address"
                                    name="address"
                                    label="Address"
                                    variant="outlined"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="city"
                                            name="city"
                                            label="City"
                                            variant="outlined"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="zip"
                                            name="zip"
                                            label="ZIP Code"
                                            variant="outlined"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="phone"
                                            name="phone"
                                            label="Phone Number"
                                            variant="outlined"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Typography variant="h6" gutterBottom>
                                    Selected Products
                                </Typography>
                                {/* Add your selected products display here */}
                                <Button className = "normal_btn" type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>
                                    Place Order
                                </Button>
                            </form>
                            <form onSubmit={handlePickSubmit} className='py-6'>
                                {/* <div>
                                    <input id='pickfromshop' type="checkbox" onChange={handlePickFromShop} />
                                    <label htmlFor="pickfromshop">Select if want to Collect your order from our shop location.</label>
                                </div> */}
                                {
                                    pickFromStore &&
                                    <div className='flex flex-col w-48'>
                                        <p>Please provide the time the item to be picked up</p>
                                        <label for="birthday">Birthday:</label>
                                        <input type="date" id="birthday" name="birthday" />
                                        <Button type="submit" className=" normal_btn bg-blue-500 border-2 py-2 px-4 rounded-md hover:bg-blue-600 mt-4">Place Order</Button>
                                    </div>
                                }
                            </form>
                        </>

                }
            </div>
        </Layout>
    );
};

export default Checkout;
