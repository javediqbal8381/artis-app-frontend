import React from 'react';
import Layout from '../components/layouts/Layout';
import { Container, Typography, Paper, Link } from '@mui/material';
import { motion } from 'framer-motion';
const About = () => {
  return (
    <Layout>
       <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
      <Container maxWidth="md" mt={8} style={{minHeight:"90vh"}}>
        <Typography variant="h4" component="h2" gutterBottom>
          About Us
        </Typography>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 , mb : 10}}>
          <Typography variant="body1" gutterBottom>
            Welcome to MyArtisApp - your destination for unique handcrafted products from artisans
            around the world.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our mission is to connect talented artisans with discerning customers who appreciate
            quality, craftsmanship, and the stories behind each piece.
          </Typography>
          <Typography variant="body1" gutterBottom>
            At MyArtisApp, we believe in supporting small businesses and preserving traditional
            crafts. Each item in our collection is carefully curated to ensure authenticity,
            sustainability, and beauty.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Whether you're searching for the perfect gift or looking to add a touch of personality
            to your home, MyArtisApp offers a diverse selection of handmade goods to suit every
            taste and style.
          </Typography>
          <Typography variant="h6" component="p" fontWeight="bold" mt={2}>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Have questions, feedback, or just want to say hello? We'd love to hear from you! Reach
            out to us at{' '}
            <Link href="mailto:info@example.com" color="primary">
              info@example.com
            </Link>
            .
          </Typography>
          <Typography variant="body1">
            Interested in becoming an artisan seller on our marketplace? Visit our{' '}
            <Link href="/sell" color="primary">
              Sell with Us
            </Link>{' '}
            page to learn more.
          </Typography>
        </Paper>
      </Container>
      </motion.div>
    </Layout>
  );
};

export default About;
