import React, { Suspense, lazy } from "react";

// Lazy load all components
const Hero = lazy(() => import("../components/Hero.jsx"));
const FeaturedProducts = lazy(() => import("../components/FeaturedProducts.jsx"));
const About = lazy(() => import("../components/About.jsx"));
const BrandStory = lazy(() => import("../components/BrandStory.jsx"));
const Blog = lazy(() => import("../components/Blog.jsx"));
const CheckIn = lazy(() => import("../components/CheckIn.jsx"));

// Loader Component
const Loader = () => (
  <div className="flex items-center justify-center py-20 min-h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
  </div>
);

const Home = React.memo(() => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <About />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <BrandStory />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Blog />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <CheckIn />
      </Suspense>
    </div>
  );
});

export default Home;
