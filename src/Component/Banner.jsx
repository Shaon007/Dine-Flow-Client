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
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://i.pinimg.com/736x/c2/8e/f9/c28ef962fe5bcf0b968a217f0f5d5cf6.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://i.pinimg.com/736x/d9/32/5d/d9325d4a1c8158ed4c22550d966d55ea.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://i.pinimg.com/736x/f4/3c/90/f43c908cbc17e6094c35494b115c81cd.jpg" alt="" /></SwiperSlide>
    
      </Swiper>
    </>
  );
}
