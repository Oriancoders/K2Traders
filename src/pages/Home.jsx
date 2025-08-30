import React from 'react';
import Hero from '../components/Hero.jsx';
import FeaturedProducts from '../components/FeaturedProducts.jsx';
import About from '../components/About.jsx';
import BrandStory from '../components/BrandStory.jsx';
import Blog from '../components/Blog.jsx';
import CheckIn from '../components/CheckIn.jsx';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <About />
      <BrandStory />
      <Blog />
      <CheckIn />
    </div>
  );
};

export default Home;