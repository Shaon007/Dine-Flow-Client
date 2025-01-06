import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="hero bg-base-200 mx-auto p-4">
      <div className="hero-content flex-col lg:flex-row md:flex-col gap-8 mx-auto">
        {/* Slider Section */}
        <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg">
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
                <div className="p-4 rounded-lg">
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="rounded-md mx-auto w-full max-h-48 sm:max-h-64 lg:max-h-96 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            animate={
              isLargeScreen
                ? { x: [0, 20, 0] }
                : { y: [0, -10, 0] }
            }
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-xs sm:max-w-md lg:max-w-lg mx-auto"
          >
            Effortless Food Management
          </motion.h1>
          <p className="py-4 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
            Simplify your food menu with seamless options to add, edit, and organize dishes. Keep your offerings fresh and tailored to delight your customers.
          </p>
          <Link to="/allFoods">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
