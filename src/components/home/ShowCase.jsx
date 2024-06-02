import React from 'react';

const ShowCase = () => {
  return (
    <div className="flex hero_showcase justify-center items-center flex-wrap min-h-[100vh] py-32">

      <video autoplay muted loop className='hero_showcase_video'>
        <source src='https://res.cloudinary.com/ddnrxtthk/video/upload/v1714546255/artis-app/3064242-hd_1920_1080_24fps_pa87yj.mp4'/>
      </video>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mx-2 my-2 text-white flex items-center justify-center">
        <p className='md:text-veryLarge'>
          The Art Center
        </p>
      </div>
    </div>
  );
};

export default ShowCase;
