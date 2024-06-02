import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import whexagonImg from '../../assets/w-hexagon.webp';
import { GiForest, GiPineTree } from 'react-icons/gi';
import { BiBook, BiGlobe } from 'react-icons/bi';

const HeroSection = () => {
  const heroImgRep = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = heroImgRep.current.offsetLeft + heroImgRep.current.offsetWidth / 2;
      const centerY = heroImgRep.current.offsetTop + heroImgRep.current.offsetHeight / 2;
      const moveX = (centerX - clientX) / 30;
      const moveY = (centerY - clientY) / 30;
      heroImgRep.current.style.transform = `rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    };

    // Add event listener for mousemove
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const landingPageTexts = [
    {
      heading: "Nature's Canvas",
      subheading: "Where Each Stroke of Brush and Pen Weaves Tales of Natural Splendor",
      icon: <GiForest style={{ color: "#ffff", width: "50px", height: "50px", background: "linear-gradient(#359dde, #2feaed)", borderRadius: "50%", padding: "10px" }} />
    },
    {
      heading: "Serenity Scrolls",
      subheading: "Where Every Canvas and Paper Tells Stories of Tranquil Landscapes",
      icon: <GiPineTree style={{ color: "#ffff", width: "50px", height: "50px", background: "linear-gradient(#359dde, #2feaed)", borderRadius: "50%", padding: "10px" }} />
    },
    {
      heading: "Landscape Tales",
      subheading: "Where Every Month Unveils a New Chapter of Nature's Ever-changing Story",
      icon: <BiBook style={{ color: "#ffff", width: "50px", height: "50px", background: "linear-gradient(#359dde, #2feaed)", borderRadius: "50%", padding: "10px" }} />
    },
    {
      heading: "Earthly Expressions",
      subheading: "Where Each Painting Reflects the Timeless Beauty of Mother Nature's Splendor",
      icon: <BiGlobe style={{ color: "#ffff", width: "50px", height: "50px", background: "linear-gradient(#359dde, #2feaed)", borderRadius: "50%", padding: "10px" }} />
    },
  ];

  return (
    <div className='min-h-[12 5vh] flex items-center w-full justify-between flex-col gap-4 pt-[20vh]'>
    <div className='flex items-center w-full justify-center flex-col gap-4'>
        <img ref={heroImgRep} className='hero_img' src={whexagonImg} alt="heroImg" />
        <p>----  Made With Love and patience  ----</p>
        <p className='text-center text-mid max-w-[44rem]'>
          Unleash your creativity with ArtisanMarketPlace - where passion meets pixels.
          Elevate your artistic journey with our intuitive platform designed
          for artists, by artists.
        </p>
        <Link className='home_btn' to={'/products'}>
          EXPLORE
        </Link>
      </div>
      <div className="flex flex-col gap-16 md:gap-0 md:flex-row items-center px-32 mt-48 pb-24 justify-between w-full">
        <div className="w-full md:w-1/2 h-full">
          <img src="/HandmadeBusiness.jpg" width={500} />
        </div>
        <div className="w-full md:w-1/2 p-2">
          {
            landingPageTexts.map((item, index) => {
              return (
                <div key={index} className="flex p-2 min-w-[270px]  space-x-10 items-center pb-4 w-full text-center">
                  <div>
                    {item.icon}
                  </div>
                  <div>
                    <h1 className="w-full text-left text-xl font-bold">
                      {item.heading}
                    </h1>
                    <p className="text-left">
                      {item.subheading}
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
