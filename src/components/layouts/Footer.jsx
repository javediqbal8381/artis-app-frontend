import React from 'react';
import { Container, Typography, Grid, List, ListItem, Link } from '@mui/material';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>About ArtisanMarketPlace</Typography>
            <Typography variant="body1" align="justify" gutterBottom>
              ArtisanMarketPlace is an online platform dedicated to promoting and showcasing various forms of art. We strive to provide a platform for artists from around the world to share their creativity with others. Our mission is to inspire and connect people through art, whether it's paintings, pottery, glasswork, home decor, or any other form of creative expression.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Categories</Typography>
            <List>
              <ListItem>
                <Link href="/products/catagory/paintings/">Paintings</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/catagory/pottery/">Pottery</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/catagory/glass/">Glass</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/catagory/home-decor/">Home Decor</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/catagory/garden/">Garden</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/catagory/fabric/">Fabric</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/catagory/wood/">Wood</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/catagory/fine-craft/">Fine Craft</Link>
              </ListItem>
              <ListItem>
                <Link href="/products/catagory/personalization/">Personalization</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <List>
              <ListItem>
                <Link href="/about">About Us</Link>
              </ListItem>
              <ListItem>
                <Link href="/contact">Contact Us</Link>
              </ListItem>
              <ListItem>
                <Link href="/signin">Contribute</Link>
              </ListItem>
              <ListItem>
                <Link href="/about">Privacy Policy</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/sitemap/">Sitemap</Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <hr />
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2">
              Copyright &copy; 2017 All Rights Reserved by <Link href="#">ArtisanMarketPlace</Link>.
            </Typography>
          </Grid>
          <Grid item>
            <List>
              <ListItem>
                <Link href="#" aria-label="Facebook"><FaFacebook /></Link>
              </ListItem>
              <ListItem>
                <Link href="#" aria-label="Twitter"><FaTwitter /></Link>
              </ListItem>
              <ListItem>
                <Link href="#" aria-label="LinkedIn"><FaLinkedin /></Link>
              </ListItem>
              <ListItem>
                <Link href="#" aria-label="GitHub"><FaGithub /></Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
