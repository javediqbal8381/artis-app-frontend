// Shops.js
import React from 'react';
import { BsGeoAlt, BsClock, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import StartRatings from '../commen/StartRatings';
import { shopsApi } from '../../redux/api/shopsApi';
import Loader from '../commen/Loader'

const ShopsList = () => {
    const navigate = useNavigate()
    const gotoShop = (shopId) => {
        navigate(`/shops/${shopId}`)
    }
    const { isLoading, isError, data: shops } = shopsApi.useGetAllShopsQuery()
    return (
        <div className="container mx-auto mt-8 min-h-[90vh]">
            <h2 className="text-3xl font-bold mb-4">Explore Online ShopsList</h2>
            {
                isLoading ?
                    <Loader /> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {shops.map((shop) => (
                            <div onClick={() => gotoShop(shop._id)} key={shop._id} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
                                <img
                                    className="w-full h-40 object-cover mb-4 rounded-md"
                                    src={shop.image}  // Assuming your images are in the 'images' folder
                                    alt={shop.name}
                                />
                                <h3 className="text-xl font-bold mb-2">{shop.name}</h3>
                                <p className="text-gray-600 mb-2">
                                    <BsGeoAlt className="inline-block mr-2" />
                                    {shop.location}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <BsClock className="inline-block mr-2" />
                                    {shop.hours}
                                </p>
                                <div className="flex items-center mb-4">
                                    <BsStarFill className="text-yellow-500 mr-1" />
                                    <span className="text-gray-700">
                                        <StartRatings rating={shop.rating} />
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-4">{shop.description}</p>
                                <a
                                    href={shop.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Visit Website
                                </a>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default ShopsList;
