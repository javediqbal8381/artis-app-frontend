import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { shopsApi } from '../../redux/api/shopsApi';
import Layout from '../../components/layouts/Layout';
import { productsApi } from '../../redux/api/productApi';
import { FiTrash2 } from "react-icons/fi";
import Loader from '../../components/commen/Loader';
import { ordersApi } from '../../redux/api/orderApi';
import ShopChat from '../../components/ShopChat/ShopChat';
import { Button, Dialog, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography } from '@mui/material';
import { motion } from "framer-motion"; // Import Framer Motion


const ArtisShopDetail = () => {
  const { shopId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOrders, setShowOrders] = React.useState(false)

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    artisan: '',
    price: '',
    description: '',
    images: ['', '', ''],
    rating: 0,
    shopId,
    deliveryFee: '',
    ratingAmount: 0
  });

  const [productImages, setProductImages] = useState([])

  const [isOpen, setIsOpen] = useState(false);


  const { data: shop, isSuccess, isLoading, isError, refetch: refetchProducts } = shopsApi.useGetAllShopProductsQuery(shopId)
  const [uploadProduct, { isError: errorCreatingProduct, data: uploadedProduct }] = productsApi.useUploadProductMutation();
  const [deleteProduct, { isError: errorDeletinggProduct, isLoading: isDeletingProduct }] = productsApi.useDeleteProductMutation()
  const [deleteShop, { }] = shopsApi.useDeleteShopMutation()
  const { isError: ordersError, isLoading: ordersLoading, data: orders } = ordersApi.useGetOrderByShopQuery(shopId)

  const handleRemoveProduct = (productId) => {
    deleteProduct({
      productId,
      shopId: shop._id
    })
  };

  useEffect(() => {
    if (uploadedProduct) {
      refetchProducts()
    }
  }, [uploadedProduct])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadProductImages = async (images) => {
    const uploadPromises = images.map(async (image) => {
      const data = new FormData();
      data.append("file", image);
      data.append(
        "upload_preset",
        import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
      );
      data.append("cloud_name", import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME);
      data.append("folder", "ArtisanMarketPlace");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        // Assuming you want to set the URL of the uploaded image file
        return res.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null; // Return null in case of error
      }
    });

    // Wait for all upload promises to resolve
    const uploadedUrls = await Promise.all(uploadPromises);

    return uploadedUrls.filter(url => url !== null); // Filter out any null values
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };

  const handleUploadProduct = async (e) => {
    e.preventDefault()
    try {
      const images = await uploadProductImages(productImages)
      // Call the uploadProduct mutation function with formData
      uploadProduct({ ...formData, images: images });
      // Reset form data and close modal
      setFormData({
        category: '',
        name: '',
        artisan: '',
        price: '',
        description: '',
        images: ['', '', ''],
        rating: 0,
        shopId,
        deliveryFee: '',
        ratingAmount: 0
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  const handleDeleteShop = () => {
    deleteShop(shopId)
  }

  if (isLoading) return <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
    <Loader />
  </div>;
  if (isError) return <div>Error: {isError}</div>;

  if (!shop) {
    return <div>Shop not found</div>;
  }
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-8">
          <Typography variant="h2" component="h1" className="text-3xl font-semibold mb-4"><strong>{shop?.name}</strong> Shop Detail</Typography>
          <Typography variant="body1" component="p" className="mb-4">Location: {shop?.location}</Typography>
          <Typography variant="body1" component="p" className="mb-4">Website: <Link href={shop?.website} target="_blank" rel="noreferrer">{shop?.website}</Link></Typography>
          <Typography variant="body1" component="p" className="mb-4">Description: {shop?.description}</Typography>
          <Button className="normal_btn" variant='contained' onClick={() => setIsModalOpen(true)}>Upload Products</Button>
          <br />
          {isModalOpen && (
            <div className=" inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Upload Product</h3>
                <form onSubmit={handleUploadProduct} className="space-y-4">
                  <div className="flex flex-col">
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="category-label">Category:</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        label="Category"
                      >
                        <MenuItem value="">None</MenuItem> {/* Add a default value if needed */}
                        <MenuItem value="paintings">Paintings</MenuItem>
                        <MenuItem value="pottery">Pottery</MenuItem>
                        <MenuItem value="glass">Glass</MenuItem>
                        <MenuItem value="home-decor">Home Decor</MenuItem>
                        <MenuItem value="garden">Garden</MenuItem>
                        <MenuItem value="fabric">Fabric</MenuItem>
                        <MenuItem value="wood">Wood</MenuItem>
                        <MenuItem value="fine-craft">Fine Craft</MenuItem>
                        <MenuItem value="personalization">Personalization</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-semibold mb-1">Name:</label>
                    <TextField
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="artisan" className="text-sm font-semibold mb-1">Artisan:</label>
                    <TextField
                      id="artisan"
                      name="artisan"
                      value={formData.artisan}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="price" className="text-sm font-semibold mb-1">Price:</label>
                    <TextField
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm font-semibold mb-1">Description:</label>
                    <TextareaAutosize
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                      minRows={3}
                      style={{ width: '100%', resize: 'vertical' }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="deliveryFee" className="text-sm font-semibold mb-1">Delivery Fee:</label>
                    <TextField
                      id="deliveryFee"
                      name="deliveryFee"
                      value={formData.deliveryFee}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="image3" className="text-sm font-semibold mb-1">Image 3:</label>
                    <input
                      id="image3"
                      name="images[2]"
                      onChange={e => handleImageChange(e)}
                      type='file'
                      multiple
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button className="normal_btn"
                      variant="contained"
                      color="error"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="normal_btn"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Upload
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <br />
          <Button className="normal_btn"
            variant="outlined"
            color="error"
            startIcon={<FiTrash2 color='red' />}
            onClick={handleDeleteShop}
          >
            Delete Shop
          </Button>
          <br />
          <br />
          <div className='flex gap-5'>
            <Button className="normal_btn" onClick={() => setShowOrders(false)} variant={showOrders ? 'outlined' : 'contained'}>Products</Button>
            <Button className="normal_btn" onClick={() => setShowOrders(true)} variant={showOrders ? 'contained' : 'outlined'}>Orders</Button>
            <Button className="normal_btn" onClick={() => setIsOpen(true)} variant={isOpen ? 'contained' : 'outlined'}>Open Chat</Button>
          </div>
          <br />
          {!showOrders ?
            <>
              <h2 className="text-xl font-semibold mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shop.products.map(product => (
                  <div key={product._id} className="bg-white p-4 shadow rounded-lg">
                    <img
                      className="w-full h-48 object-cover"
                      src={product.images[0]}
                      alt={product.name}
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="mb-2">Price: ${product.price}</p>
                    <p className="mb-4">Category: {product.category}</p>
                    <p className="text-sm mb-4">{product.description}</p>
                    {
                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleRemoveProduct(product._id)}
                          className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600 normal_btn"
                        >
                          <FiTrash2 color='red' />
                        </Button>
                      </div>
                    }
                  </div>
                ))}
              </div>
            </>
            :
            <>
              <h2 className="text-xl font-semibold mb-4">Orders</h2>
              {
                orders.map(order => (
                  <div key={order._id} className="bg-white shadow-lg rounded-md p-4 mb-4 w-300 h-150">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">Order ID: {order.orderId}</span>
                      <span className="text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Total Price: ${order.totalPrice}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Products: {order.products.join(', ')}
                    </div>
                    <div className="text-sm text-gray-600">
                      Shop ID: {order.shopId}
                    </div>
                  </div>
                ))
              }

            </>
          }
        </div>
        {isOpen &&
          <Dialog open={isOpen}>
            <ShopChat isOpen={isOpen} setIsOpen={setIsOpen} shopId={shopId} />

          </Dialog>
        }
      </motion.div>
    </Layout>
  );
};

export default ArtisShopDetail;