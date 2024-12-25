import React from 'react';
import Banner from '../Component/Banner';
import TopFood from './TopFood';
import CountryFood from '../Component/CountryFood';
import Review from '../Component/Review';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopFood></TopFood>

      {/* Country Food Section */}
      <div className="p-6 space-y-8 w-11/12  mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6">Explore Your Native Foods...</h2>
        <CountryFood country="China" />
        <CountryFood country="Italy" reverse />
        <CountryFood country="Japan" />
      </div>

      {/* review Section */}
        <Review></Review>
    </div>
  );
};

export default Home;
