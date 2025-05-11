import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center justify-center z-20'>
          <div className='text-center text-white font-mono'>
            <h2 className='text-md md:text-2xl font-semibold'>-- Savor the Flavor --</h2>
            <h2 className='text-white text-2xl md:text-8xl font-bold italic'>DineFlow</h2>
            <h2 className='text-md md:text-xl'>Where Every Bite Tells a Story.</h2>
            <button className='mt-16 border-b-2 border-cyan-500 text-xl md:text-2xl hover:text-cyan-500'>Contact US</button>
          </div>
        </div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >

          <SwiperSlide><img className='brightness-50' src="https://tint.creativemarket.com/_HAQrXLcjkzwgVSGGu7S_dLVom3P-aFMvyvvh383Cjk/width:1820/height:1212/gravity:ce/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzM1Ni8zNTY3LzM1NjcxMTAvcjU0a3JiYWp6bWowMW12YjhxajBtY3BuaXNjcnJvcjhrY2l4NzFpMDM2dHRjNXRxMmZncmNlYnIyamRxeGRrcS1vLmpwZw?1510557378" alt="banner1" /></SwiperSlide>
          <SwiperSlide><img className='brightness-50' src="https://i.pinimg.com/1200x/73/1b/9e/731b9e6e1f0c240fe330e05344054fd9.jpg" alt="banner2" /></SwiperSlide>

          <SwiperSlide><img className='brightness-50' src="https://i.pinimg.com/1200x/24/a1/c5/24a1c58e10f311a2e2f491f78d1334c7.jpg" alt="banner3" /></SwiperSlide>
          <SwiperSlide><img className='brightness-50'  src="https://i.pinimg.com/1200x/03/a3/70/03a370a93b429a30451122ab436f25a2.jpg" alt="banner4" /></SwiperSlide>
          <SwiperSlide><img className='brightness-50' src="https://i.pinimg.com/1200x/ef/7d/a6/ef7da692d3e9b93452ca522dd512741f.jpg" alt="banner6" /></SwiperSlide>


        </Swiper>
      </div>

    </>
  );
}
