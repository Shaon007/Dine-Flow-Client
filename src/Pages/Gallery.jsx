import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    { src: "https://i.pinimg.com/736x/b0/37/cf/b037cf4b84a9f217b5576d07d4011f6a.jpg", name: "Veg Plater", description: "Fresh veggies with delightful flavors." },
    { src: "https://i.pinimg.com/736x/37/e8/a9/37e8a9af781d6f95b8fb2578681740e6.jpg", name: "Poached Salmon", description: "Tender Salmon in Coconut Lime Sauce" },
    { src: "https://i.pinimg.com/736x/4d/1d/e0/4d1de0f3698d6d193066ad8ea1dfec63.jpg", name: "Spring Roll", description: "Crispy rolls with savory filling." },
    { src: "https://i.pinimg.com/736x/ca/bf/cc/cabfcc101fa6f6d99b3c07e9997f7c47.jpg", name: "Chicken Biriyani", description: "Spiced rice with tender chicken." },
    { src: "https://i.pinimg.com/736x/92/15/61/9215615b380536f5903fb6c55c2bb0a4.jpg", name: "Chicken Chowmen", description: "Stir-fried noodles with chicken." },
    { src: "https://i.pinimg.com/736x/79/e1/ee/79e1eea4361f31fd5f31d0280a2e5a04.jpg", name: "Samusa", description: "Crispy pastry filled with spiced filling." },
    { src: "https://i.pinimg.com/736x/9d/45/e8/9d45e8a091f54f542a71e24ef5ccda2a.jpg", name: "Chocolet Cake", description: "Rich, moist, and decadent chocolate treat." },
    { src: "https://i.pinimg.com/736x/52/34/90/5234907fb35fc29a79936fafc078e70f.jpg", name: "Caramel Hazzlenut IceCoffee", description: "Sweet, creamy, and nutty iced delight." },
    { src: "https://i.pinimg.com/736x/a6/d5/53/a6d553f0cdf28c81723f3d0e4008d3d2.jpg", name: "Cheeseballs", description: "Juicy, savory, and perfectly seasoned." },
    { src: "https://i.pinimg.com/736x/33/1b/66/331b66f73e93cf722819fe05758493d2.jpg", name: "Ratatouille", description: "Colorful vegetable medley in sauce." },
  ];

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Page Title */}
      <h1 className="text-4xl pt-10 font-mono font-bold text-center mb-10 dark:text-gray-200">Gallery</h1>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-60 object-cover rounded-lg shadow-md"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white text-lg font-semibold">{image.name}</p>
              <p className="text-white text-sm">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((image) => ({ src: image.src }))}
        index={currentImage}
      />
    </div>
  );
};

export default Gallery;
