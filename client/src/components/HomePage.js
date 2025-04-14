import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-red-900">
      {/* Particles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            color: { value: '#ffffff' },
            move: { enable: true, speed: 1 },
            links: { enable: true, color: '#ffffff' },
          },
        }}
      />

      {/* Slideshow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={images[current]}
          alt="slide"
          className="w-full h-screen object-cover transition-opacity duration-1000 opacity-90 scale-105"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-screen text-center px-4 bg-black bg-opacity-40">
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-500 to-orange-500 animate-pulse drop-shadow-lg">
          Igniting Innovation. Powering Ideas.
        </h1>

        <p className="mt-6 max-w-3xl text-lg sm:text-xl text-white bg-black bg-opacity-30 p-4 rounded-xl backdrop-blur">
          Welcome to the Project Development Center (PDC) of KIT - Kalaignarkarunanidhi Institute of Technology.
          A portal celebrating creativity, collaboration, and technical excellence.
        </p>

        <Link
          to="/login"
          className="mt-8 inline-block bg-white text-red-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-full text-lg shadow-lg transition duration-300"
        >
          Login to Explore →
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
