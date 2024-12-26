import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Static images data
  const images = [
    { src: "image1.jpg", name: "User 1", description: "Short description 1" },
    { src: "image2.jpg", name: "User 2", description: "Short description 2" },
    { src: "image3.jpg", name: "User 3", description: "Short description 3" },
    { src: "image4.jpg", name: "User 4", description: "Short description 4" },
    { src: "image5.jpg", name: "User 5", description: "Short description 5" },
    { src: "image6.jpg", name: "User 6", description: "Short description 6" },
    { src: "image7.jpg", name: "User 7", description: "Short description 7" },
    { src: "image8.jpg", name: "User 8", description: "Short description 8" },
    { src: "image9.jpg", name: "User 9", description: "Short description 9" },
    { src: "image10.jpg", name: "User 10", description: "Short description 10" },
  ];

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center mb-10">Gallery</h1>

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
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
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
