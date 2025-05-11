import React from 'react';
import imageLeft from '../assets/images/freepik__upload__99968.png'
import imageRight from '../assets/images/freepik__upload__99968(1)(1).png'
const Welcome = () => {
  return (
    <div className='grid grid-cols-4 gap-4 p-6 my-16 mx-auto w-11/12 text-center'>
      <div className='col-span-1'><img src={imageLeft} alt="" /></div>
      <div className='col-span-2  font-mono flex flex-col items-center justify-center '>
        <h2 className='text-cyan-600  text-xl'>-- WELCOME --</h2>
        <h1 className='text-3xl my-6'>Dine at DineFlow</h1>
        <h3 className='text-xl text-gray-700'>"Step into a world where every dish is a masterpiece. At DineFlow, we blend taste, ambiance, and passion to craft unforgettable dining experiences."</h3>
        <button className='mt-12 border-b-2 border-cyan-500 text-2xl hover:text-cyan-500'>Order Now</button>
      </div>
      <div className='col-span-1'><img src={imageRight} alt="" /></div>
    </div>
  );
};

export default Welcome;