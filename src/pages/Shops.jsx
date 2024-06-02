import React from 'react';
import Layout from '../components/layouts/Layout';
import ShopsList from '../components/shops/ShopsList';
import { Link } from 'react-router-dom';
import { Container, Button } from '@mui/material';

const Shops = () => {
  return (
    <Layout>
      <Container maxWidth="lg" style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Visit You Shops</h1>
        <Button className = "normal_btn"
          variant="contained"
          color="primary"
          component={Link}
          to="/artis-shops"
          style={{ marginBottom: '1rem' }}
        >
          My Shops
        </Button>
        <ShopsList />
      </Container>
    </Layout>
  );
};

export default Shops;
