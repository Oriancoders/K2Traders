import React from 'react';
import ProductCard from './ProductCard.jsx';
import { products } from '../data/products.js';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p?.featured);

  if (!featuredProducts.length) return null;

  return (
    <section
      aria-labelledby="featured-heading"
      className="py-20 bg-gradient-to-b from-white via-green-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-6">
          <div>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Handpicked
            </span>
            <h2 id="featured-heading" className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Featured Products
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Discover customer favorites sourced from the pristine valleys of Gilgit-Baltistan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 font-semibold text-green-700 shadow hover:shadow-md hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-label="View full shop"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;