import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { AiFillBank, AiFillBulb, AiFillHome, AiFillBuild, AiFillDribbbleSquare, AiFillTool, AiFillEdit, AiOutlineGift } from 'react-icons/ai';
import { FaPaintbrush } from "react-icons/fa6";
const CategoriesBar = () => {
    return (
        <div
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    backgroundColor: '#f3f4f6' // Set your desired background color
                },
            }}
            className='md:mt-8'
        >
            <List>
                <ListItem disablePadding className="pl-5 p-2 w-full font-bold bg-lb">
                    <ListItemText primary="Collections" />
                </ListItem>
                <ListItemButton component={Link} to="/products/catagory/paintings/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <FaPaintbrush style={{ marginRight: '8px' }} /> {/* Pottery Icon */}
                    <ListItemText primary="Paintings" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/pottery/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <AiFillBank style={{ marginRight: '8px' }} /> {/* Pottery Icon */}
                    <ListItemText primary="Pottery" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/glass/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <AiFillBulb style={{ marginRight: '8px' }} /> {/* Glass Icon */}
                    <ListItemText primary="Glass" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/home-decor/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <AiFillHome style={{ marginRight: '8px' }} /> {/* Home Decor Icon */}
                    <ListItemText primary="Home Decor" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/garden/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <AiFillBuild style={{ marginRight: '8px' }} /> {/* Garden Icon */}
                    <ListItemText primary="Garden" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/fabric/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <AiFillDribbbleSquare style={{ marginRight: '8px' }} /> {/* Fabric Icon */}
                    <ListItemText primary="Fabric" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/wood/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <AiFillTool style={{ marginRight: '8px' }} /> {/* Wood Icon */}
                    <ListItemText primary="Wood" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/fine-craft/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <AiFillEdit style={{ marginRight: '8px' }} /> {/* Fine Craft Icon */}
                    <ListItemText primary="Fine Craft" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/personalization/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <AiOutlineGift style={{ marginRight: '8px' }} /> {/* Personalization Icon */}
                    <ListItemText primary="Personalization" />
                </ListItemButton>
            </List>
        </div>
    );
}

export default CategoriesBar;
