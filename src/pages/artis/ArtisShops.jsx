import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { BsGeoAlt, BsClock, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import StartRatings from '../../components/commen/StartRatings';
import { shopsApi } from '../../redux/api/shopsApi';
import Loader from '../../components/commen/Loader';
import Layout from '../../components/layouts/Layout';
import { motion } from "framer-motion"; // Import Framer Motion
import { useEffect } from 'react';

const ArtisShops = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    website: '',
    hours: '',
    rating: 0,
    description: '',
    image: '',
    products: [],
    ratingAmount: 1,
    artisId: localStorage.getItem('userId')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate = useNavigate();
  const gotoShop = (shopId) => {
    navigate(`/artis-shop-detail/${shopId}`);
  };
  const userId = localStorage.getItem('userId');
  const { isLoading, isError, data: shops, refetch: refetchShops } = shopsApi.useGetArtisShopsQuery(userId);

  const [createShop, { isError: isShopError, data: shopData, isLoading: isLoadingShopCreation }] = shopsApi.useCreateShopMutation();

  const handleCreateShop = async () => {
    createShop(formData);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if(shopData) {
      refetchShops()
    }
  }, [shopData])

  return (
    <Layout>
      <div className="container mx-auto mt-8 min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Explore Online ArtisShops</h2>
        <Button className = "normal_btn" color="primary" variant="contained" onClick={() => setIsModalOpen(true)}>Create Shop</Button>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle>Create New Shop</DialogTitle>
          <DialogContent>
            <form className="space-y-4">
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Operating Hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
              />
              <TextField
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button className = "normal_btn" onClick={() => setIsModalOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button className = "normal_btn" onClick={handleCreateShop} color="primary" variant="contained">
              Create Shop
            </Button>
          </DialogActions>
        </Dialog>

        {
          isLoading ?
            <Loader /> :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {shops.map((shop) => (
                <div onClick={() => gotoShop(shop._id)} key={shop._id} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
                  <img
                    className="w-full h-40 object-cover mb-4 rounded-md"
                    src={shop.image}
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
    </Layout>
  );
};

export default ArtisShops;
