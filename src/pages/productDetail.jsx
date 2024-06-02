import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { shops } from '../data/shops.json';
import Layout from '../components/layouts/Layout';
import StarRatings from '../components/commen/StartRatings';
import OutlinedButton from '../components/commen/buttons/OutlinedButton';
import { productsApi } from '../redux/api/productApi';
import { useDispatch } from 'react-redux';
import { addtoCart, storecheckoutProductsInfo } from '../redux/slices/cartSlice';
import Loader from '../components/commen/Loader';
import { shopsApi } from '../redux/api/shopsApi';
import Chat from '../components/commen/Chat';
import { Button } from '@mui/material';

const ProductDetail = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    const { productId } = useParams();
    const { isError, isLoading, data: product } = productsApi.useGetProductDetailsQuery(productId)
    const { data: shopOfProduct, isLoading: isShopLoading } = shopsApi.useGetShopByIdQuery(product?.shopId, { skip: !product })
    const [getMoreProducts, { isError: isErrorProducts, isLoading: isLoadingProducts, data: moreProducts }] = productsApi.useGetProductsDetailListMutation()
    const [rateProduct,] = productsApi.useRateProductMutation()

    useEffect(() => {
        if (shopOfProduct) {
            getMoreProducts(shopOfProduct.products)
        }
    }, [shopOfProduct])
    if (!product) {
        return <div>Product not found</div>;
    }

    console.log(product.shopId)

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleAddToCart = (productId) => {
        dispatch(addtoCart(productId))
        // Get current cart items from cookie
        const existingCartItems = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
        const cartItems = existingCartItems ? JSON.parse(existingCartItems.split('=')[1]) : [];
        // Add productId to cart
        cartItems.push(productId);
        // Update cartItems in cookie
        document.cookie = `cartItems=${JSON.stringify(cartItems)};max-age=604800;path=/`; // Max age set to 1 week (604800 seconds)
    };
    const handleOrderNow = () => {
        // Implement order now functionality
        const data = JSON.stringify({
            totalDeliveryFee: product.deliveryFee,
            totalPrice: product.price
        })
        localStorage.setItem('checkoutInfo', data)
        navigate(`/checkout?productid=${product._id}`)
    };

    const handleStarClick = (starIndex) => {
        rateProduct({
            starIndex,
            productId
        })
    }

    return (
        <Layout>
            <div className="container mx-auto mt-8 min-h-[90vh] flex flex-col sm:flex-row justify-center">
                {
                    isLoading || isLoadingProducts || isShopLoading || !moreProducts ?
                        <div className='h-[100%]'>
                            <Loader />
                        </div>
                        :
                        <>
                            <div className="w-full sm:w-2/3">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <img
                                        className="w-[60%] h-auto object-contain mb-4 rounded-md"
                                        src={product.images[selectedImageIndex]}
                                        alt={product.name}
                                    />
                                    <div className="flex justify-between mb-4 pt-6">
                                        {product.images?.map((image, index) => (
                                            <img
                                                key={index}
                                                className={`w-1/4 h-auto object-contain cursor-pointer ${index === selectedImageIndex ? 'border-2 border-blue-500' : ''}`}
                                                src={image}
                                                alt={product.name}
                                                onClick={() => handleThumbnailClick(index)}
                                            />
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-2">Category: {product.category}</p>
                                    <p className="text-gray-600 mb-2">Price: {product.price}pkr</p>
                                    <p className="text-gray-700 mb-4">{product.description}</p>
                                    <StarRatings
                                        detail={"product"}
                                        rating={product.rating}
                                        handleStarClick={handleStarClick}
                                    />
                                    <br />
                                    <div className="flex gap-4">
                                        <Button className = "normal_btn" variant="outlined" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
                                        {/* <Button className = "normal_btn" variant="outlined" onClick={handleOrderNow}>Order Now</Button> */}
                                        <Button className = "normal_btn" variant="outlined" onClick={() => setIsOpen(true)}>Chat Now</Button>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                                    <img src={shopOfProduct.image} alt="shop" />
                                    <div>
                                        <p className='text-mid'>{shopOfProduct.name}</p>
                                        <StarRatings rating={shopOfProduct.rating} />
                                        <p>{shopOfProduct.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-3/4  sm:w-1/3 pl-8">
                                <h3 className="text-2xl font-bold mb-4">More Products from the Same Shop</h3>
                                {moreProducts.map((p) => (
                                    <div key={p._id} className="bg-white p-4 mb-4 rounded-md shadow-md">
                                        <img
                                            className="w-full h-auto object-contain mb-2 rounded-md"
                                            src={p.images[0]}
                                            alt={p.name}
                                        />
                                        <h4 className="text-lg font-semibold mb-1">{p.name}</h4>
                                        <p className="text-gray-600">Price: {p.price} pkr</p>
                                    </div>
                                ))}
                            </div>
                        </>
                }
                {isOpen &&
                    <Chat isOpen={isOpen} setIsOpen={setIsOpen} shopId={product?.shopId} />
                }
            </div>
        </Layout>
    );
};

export default ProductDetail;
