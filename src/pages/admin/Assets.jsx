import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Paper,
  Select,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { productsApi } from '../../redux/api/productApi'
import { shopsApi } from '../../redux/api/shopsApi';
import { ordersApi } from '../../redux/api/orderApi';

const Assets = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [updatedProductData, setUpdatedProductData] = useState({})
  const [updatedOrderData, setUpdatedOrderData] = useState({});
  const [updatedShopData, setUpdatedShopData] = useState({});

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [updateProduct, { isError: isEditingProductError }] = productsApi.useUpdateProductMutation()
  const [updateShop, { isError: isEditingShopError }] = shopsApi.useUpdateShopMutation()
  const [updateOrder, { isError: isEditingOrderError }] = ordersApi.useUpdateOrderMutation()

  const { data: products, isLoadingproductsLoading, isError: isProductsError, refetch: refetchProducts } = productsApi.useGetAllProductsQuery()
  const [deleteProduct, { isError: isDeletingProductError, }] = productsApi.useDeleteProductMutation();

  const { data: shops, isLoadingShopsLoading, isError: isShopsError, refetch: refetchShops } = shopsApi.useGetAllShopsQuery();
  const [deleteshop, { isError: isDeletingShopError, }] = shopsApi.useDeleteShopMutation();

  const { data: orders, isLoadingOrdersLoading, isError: isOrdersError, refetch: refetchOrders } = ordersApi.useGetAllOrdersQuery();
  const [deleteOrder, { isError: isDeletingOrderError, }] = ordersApi.useDeleteOrderMutation();


  const handleSaveChanges = async () => {
    try {
      if (currentTab === 0) {
        // Save edited product
        updateProduct({ productId: selectedItem._id, updatedProductData });
        setTimeout(() => {
          refetchProducts()
        }, 3000);
      } else if (currentTab === 1) {
        // Save edited shop
        updateShop({ shopId: selectedItem._id, shopData: updatedShopData })
        setTimeout(() => {
          refetchShops()
        }, 3000);
      } else if (currentTab === 2) {
        // Save edited order
        updateOrder({ orderId: selectedItem._id, orderData: updatedOrderData })
        setTimeout(() => {
          refetchOrders()
        }, 3000);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleDeleteItem = (id) => {
    // Delete item logic (to be implemented)
    console.log(`Delete item with ID ${id}`);
  };



  const handleRemoveProduct = (product) => {
    deleteProduct({
      productId: product._id,
      shopId: product.shopId
    })
    setTimeout(() => {
      refetchProducts()
    }, 3000);
  };

  const handleRemoveShop = (shopId) => {
    deleteshop(shopId)
    setTimeout(() => {
      refetchShops()
    }, 3000);
  };

  const handleRemoveOrder = (orderId) => {
    deleteOrder(orderId)
    setTimeout(() => {
      refetchOrders()
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'red';
      case 'onway':
        return 'goldenrod'; // You can use 'golden' if you want a more precise golden color
      case 'delivered':
        return 'green';
      default:
        return 'inherit'; // fallback to default color
    }
  };


  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h4" mb={4}>Management</Typography>
      <Tabs value={currentTab} onChange={handleChangeTab} centered>
        <Tab label="Products" />
        <Tab label="Shops" />
        <Tab label="Orders" />
      </Tabs>
      <Box mt={4}>
        {currentTab === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products && products.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell title={item.description}>{item.description.substring(0, 30)}...</TableCell>
                    <TableCell>
                      <Button className="normal_btn" onClick={() => handleEditItem(item)} variant="outlined" color="primary">Edit</Button>
                      <IconButton onClick={() => handleRemoveProduct(item)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {currentTab === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shops && shops.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.rating}</TableCell>
                    <TableCell>
                      <Button className="normal_btn" onClick={() => handleEditItem(item)} variant="outlined" color="primary">Edit</Button>
                      <IconButton onClick={() => handleRemoveShop(item._id)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {currentTab === 2 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders && orders.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.orderId}</TableCell>
                    <TableCell style={{ color: getStatusColor(item.status) }}>{item.status}</TableCell>
                    <TableCell>{item.totalPrice}</TableCell>
                    <TableCell>{item.userId}</TableCell>
                    <TableCell>
                      <Button className="normal_btn" onClick={() => handleEditItem(item)} variant="outlined" color="primary">Edit</Button>
                      <IconButton onClick={() => handleRemoveOrder(item._id)} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Dialog for editing items */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box>
              {/* Render form fields for editing the selected item */}
              {currentTab === 0 && (
                <>
                  <TextField
                    onChange={e => setUpdatedProductData({ ...updatedProductData, name: e.target.value })}
                    label="Name" fullWidth defaultValue={selectedItem.name} />
                  <TextField
                    onChange={e => setUpdatedProductData({ ...updatedProductData, category: e.target.value })}
                    label="Category" fullWidth defaultValue={selectedItem.category} />
                  <TextField
                    onChange={e => setUpdatedProductData({ ...updatedProductData, price: e.target.value })}
                    label="Price" fullWidth defaultValue={selectedItem.price} />
                  <TextField
                    onChange={e => setUpdatedProductData({ ...updatedProductData, description: e.target.value })}
                    label="Description" fullWidth defaultValue={selectedItem.description} />
                </>
              )}
              {currentTab === 1 && (
                <>
                  <TextField
                    onChange={(e) => setUpdatedShopData({ ...updatedShopData, name: e.target.value })}
                    label="Name" fullWidth defaultValue={selectedItem.name} />
                  <TextField
                    onChange={(e) => setUpdatedShopData({ ...updatedShopData, location: e.target.value })}
                    label="Location" fullWidth defaultValue={selectedItem.location} />
                  <TextField
                    onChange={(e) => setUpdatedShopData({ ...updatedShopData, rating: e.target.value })}
                    label="Rating" fullWidth defaultValue={selectedItem.rating} />
                </>
              )}
              {currentTab === 2 && (
                <>
                  <Select fullWidth defaultValue={selectedItem.status}
                  onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, status: e.target.value })}
                  >
                    <MenuItem value={selectedItem.status} disabled>Update Status</MenuItem>
                    <MenuItem value="pending">pending</MenuItem>
                    <MenuItem value="onWay">onWay</MenuItem>
                    <MenuItem value="delivered">delivered</MenuItem>
                  </Select>
                  <TextField
                    onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, address: e.target.value })}
                    label="Address" fullWidth defaultValue={selectedItem.address} />
                  <TextField
                    onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, totalPrice: e.target.value })}
                    label="Total Price" fullWidth defaultValue={selectedItem.totalPrice} />
                  <TextField
                    onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, phone: e.target.value })}
                    label="Phone" fullWidth defaultValue={selectedItem.phone} />
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button className="normal_btn" onClick={handleCloseDialog}>Cancel</Button>
          <Button className="normal_btn" onClick={handleSaveChanges} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Assets;
