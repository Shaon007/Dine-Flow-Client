import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/c2/8e/f9/c28ef962fe5bcf0b968a217f0f5d5cf6.jpg",
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/d9/32/5d/d9325d4a1c8158ed4c22550d966d55ea.jpg",
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/f4/3c/90/f43c908cbc17e6094c35494b115c81cd.jpg",
  },
];

const Banner = () => {
  return (
    <div>
      <div className="hero bg-base-200  mx-auto">
        <div className="hero-content flex-col lg:flex-row gap-36 mx-auto">
          {/* Slider Section */}
          <div className="flex-1 max-w-lg">
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
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="p-6 rounded-lg">
                    <img
                      src={slide.image}
                      alt={`Slide ${slide.id}`}
                      className="rounded-md mx-auto w-full max-h-96 object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Text Section */}
          <div className="flex-1">
            <motion.h1
              animate={{ x: 50 }}
              transition={{
                duration: 2,
                delay: 1,
                ease: "easeOut",
                repeat: Infinity,
              }}
              className="text-5xl font-bold"
            >
              Effortless Food Management
            </motion.h1>
            <p className="py-6">
              Simplify your food menu with seamless options to add, edit, and organize dishes. Keep your offerings fresh and tailored to delight your customers.
            </p>
            <Link to='/allFoods'><button className="btn btn-primary">Get Started</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
