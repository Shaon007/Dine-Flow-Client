import React from 'react';
import Banner from '../Component/Banner';
import TopFood from './TopFood';
import CountryFood from '../Component/CountryFood';
import Review from '../Component/Review';
import Welcome from '../Component/Welcome';

const Home = () => {
  const countries = [
    {
      country: "Bangladesh",
      foodId: "676d977cc53a3d0b40bc14ff",
    },
    {
      country: "Mexican",
      foodId: "676c34ea2194f190a5bea628",
    },
    {
      country: "Japanese",
      foodId: "676c34ea2194f190a5bea629",
    },
  ];

  return (
    <div className='bg-stone-200 dark:bg-gray-900'>
      <Banner />
      <Welcome/>
      <TopFood />

      {/* Country Food Section */}
      <div className="p-6 space-y-8 w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6 dark:text-gray-300">Explore Your Native Foods...</h2>

        {/* Display food from China */}
        <CountryFood country="Bangladesh" foodId="676d977cc53a3d0b40bc14ff" />

        {/* Display food from Italy */}
        <CountryFood country="Mexican" foodId="676c34ea2194f190a5bea628" reverse />

        {/* Display food from Japan */}
        <CountryFood country="Japanese" foodId="676c34ea2194f190a5bea629" />
      </div>

      <Review />
    </div>
  );
};

export default Home;
