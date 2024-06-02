import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaAlignJustify } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import './layouts.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../../redux/slices/cartSlice';
import { Button } from '@mui/material';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Add event listener to close menu when clicked outside
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const cartInCokkie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='));
    if (cartInCokkie) {
      const cartItems = JSON.parse(cartInCokkie.split("=")[1]);
      cartItems.forEach(element => {
        dispatch(addtoCart(element));
      });
    }
  }, [dispatch]);

  const gotoCart = () => {
    navigate('/cart');
  }

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  function debounce(func, delay) {
    let timerId;
    return function (...args) {
      const context = this;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  function myFunction() {
    console.log('This function is debounced');
  }
  const debouncedFunction = debounce(myFunction, 1000);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate('/signin')
  }

  return (
    <div className='h-20 p-3 px-8 flex items-center justify-between'>
      <Link to={'/'}>
       <img width={150} src="/logo.png" alt="" />
      </Link>
      <ul className='hidden sm:flex justify-between items-center w-[60%]'>
        <li className='nav_link'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav_link'>
          <Link to='/products'>Products</Link>
        </li>
        <li className='nav_link'>
          <Link to='/shops'>Shops</Link>
        </li>
        <li className='nav_link'>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      <div className='hidden sm:flex gap-6'>
        <div onClick={gotoCart} className="relative cursor-pointer hover:scale-110">
          <FaShoppingCart size={30} />
          {
            cartItems.length > 0 &&
            <span className="absolute -top-3 -right-3 text-white text-verySmall bg-db 
            rounded-full px-[6px] text-xs">
              {cartItems.length}
            </span>
          }
        </div>
        <div ref={menuRef} className="relative cursor-pointer">
          <CgProfile size={30} onClick={toggleMenu} className='hover:scale-110' />
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/settings">Settings</Link>
                </li>
                <li onClick={logout} className="px-4 py-2 hover:bg-gray-100">
                  <Button className="normal_btn" >Logout</Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className='flex sm:hidden'>
        <FaAlignJustify />
      </div>
    </div>
  )
}

export default Navbar;
