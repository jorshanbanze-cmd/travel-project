import React, { useState, useEffect } from "react";

const images = [
  "https://ziaraatguide.com/wp-content/uploads/2025/09/547012195_1136183571941825_8550361018297439533_n-1-226x300.jpg",
  "https://ziaraatguide.com/wp-content/uploads/2025/09/fatmiyah-228x300.jpg",
  "https://ziaraatguide.com/wp-content/uploads/2025/10/3-jamad-new-222x300.jpg",
  "https://ziaraatguide.com/wp-content/uploads/2025/10/3-jamad-new-222x300.jpg",
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-xl bg-transparent shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="w-full flex-shrink-0 bg-transparent">
            <img
              src={img}
              alt={`Slide ${i}`}
              className="w-full h-auto max-h-[400px] object-contain bg-transparent"
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 transition"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 transition"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
