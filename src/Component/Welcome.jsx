import React from 'react';
import imageLeft from '../assets/images/freepik__upload__99968.png'
import imageRight from '../assets/images/freepik__upload__99968(1)(1).png'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className='grid grid-col-1 md:grid-cols-4 gap-4 p-6 my-16 mx-auto w-11/12 text-center bg-white dark:bg-stone-300'>
      <div className='col-span-1 hidden md:block'><img src={imageLeft} alt="left image" /></div>
      <div className='col-span-2  font-mono flex flex-col items-center justify-center '>
        <h2 className='text-cyan-600 text-lg md:text-xl '>-- WELCOME --</h2>
        <h1 className='text-2xl md:text-3xl my-6'>Dine at DineFlow</h1>
        <h3 className='text-lg md:text-xl text-gray-700'>"Step into a world where every dish is a masterpiece. At DineFlow, we blend taste, ambiance, and passion to craft unforgettable dining experiences."</h3>
        <button onClick={() => navigate('/allFoods')} className='mt-12 border-b-2 border-cyan-500 text-xl md:text-2xl hover:text-cyan-500'>Order Now</button>
      </div>
      <div className='col-span-1 hidden md:block'><img src={imageRight} alt="rightimage" /></div>
    </div>
  );
};

export default Welcome;