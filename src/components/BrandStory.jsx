import React from 'react';
import { Mountain, Heart, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/company.js';

const BrandStory = () => {
  return (
    <section id="brand-story" className="py-20 bg-gradient-to-b from-green-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight drop-shadow">
            Our Brand Story
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            A journey that begins in the majestic peaks of Baltistan and connects hearts worldwide
          </p>
        </div>

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-2 bg-gradient-to-br from-green-200/40 via-white/60 to-emerald-100/60 rounded-3xl blur-2xl z-0" />
            <img 
              src={companyInfo.brandStory.image}
              alt="Baltistan Mountains"
              className="relative w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-white/80 z-10"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg z-20">
              <Mountain className="h-12 w-12 text-white animate-bounce" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {companyInfo.brandStory.title}
            </h3>
            <div className="prose prose-lg text-gray-700">
              {companyInfo.brandStory.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
            Our Product Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl border border-green-100 shadow hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-white animate-pulse group-hover:animate-none" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">1. Sourcing</h4>
              <p className="text-gray-600">
                We work directly with local farmers and artisans, ensuring fair trade and authentic quality from the source.
              </p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl border border-green-100 shadow hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white animate-pulse group-hover:animate-none" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">2. Crafting</h4>
              <p className="text-gray-600">
                Traditional methods passed down through generations ensure each product maintains its authentic character and quality.
              </p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl border border-green-100 shadow hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform">
                <Mountain className="h-8 w-8 text-white animate-pulse group-hover:animate-none" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">3. Sharing</h4>
              <p className="text-gray-600">
                We carefully package and deliver these mountain treasures to your doorstep, bringing Baltistan's essence to you.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-white text-center shadow-xl">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight drop-shadow">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-3">Authenticity</h4>
              <p className="opacity-90">Every product is genuine and true to its Balti origins</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Sustainability</h4>
              <p className="opacity-90">We protect our environment for future generations</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Community</h4>
              <p className="opacity-90">Supporting local artisans and farmers in their craft</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;