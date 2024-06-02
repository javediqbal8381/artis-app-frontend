import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Container, Grid } from '@mui/material';
import { shopsApi } from '../redux/api/shopsApi';
import StartRatings from '../components/commen/StartRatings';
import Layout from '../components/layouts/Layout';
import ProductList from '../components/products/ProductsList';

const ShopDetails = () => {
  const { shopId } = useParams();

  const { data: shop, isSuccess, isLoading } = shopsApi.useGetAllShopProductsQuery(shopId);

  if (isLoading) {
    return (
      <Layout>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  if (!isSuccess || !shop) {
    return (
      <Layout>
        <Typography variant="h6">Shop not found</Typography>
      </Layout>
    );
  }

  const handleStarClick = (starIndex) => {
    // Handle star click action here
  };

  return (
    <Layout>
      <Container sx={{ mt: 8 }}>
        <Typography variant="h3" gutterBottom>{shop.name} Products</Typography>
        <Typography variant="body1">{shop.description}</Typography>
        <StartRatings
          detail="shop"
          rating={shop.rating}
          handleStarClick={handleStarClick}
        />
        <Typography variant="body2" gutterBottom>{shop.location}</Typography>
        <Typography variant="body2" gutterBottom>{shop.hours}</Typography>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <ProductList products={shop.products} />
        </Grid>
      </Container>
    </Layout>
  );
};

export default ShopDetails;
