import React from 'react';
import HeroIMG from '../Assest/aaa.jpg';
import RecentPost from '../Components/RecentPost';

const Home = () => {
  return (
    <div>
      <div 
        className="relative bg-cover bg-center h-[400px] sm:h-[500px]"
        style={{ 
          backgroundImage: `url(${HeroIMG})`,
          backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent black
          backgroundBlendMode: 'multiply' // blends the image and the color
        }}
      >
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
            Welcome to Our Blog
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl text-center mb-6">
            Explore our latest articles, tutorials, and stories from around the web.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
            className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Explore Posts
          </button>
        </div>
      </div>

      <RecentPost />
    </div>
  );
}

export default Home;
