"use client";

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'medications', name: 'Medications' },
  { id: 'medical-supplies', name: 'Medical Supplies' },
  { id: 'devices', name: 'Medical Devices' },
  { id: 'first-aid', name: 'First Aid' },
  { id: 'hygiene', name: 'Hygiene Products' },
  { id: 'baby-care', name: 'Baby Care' },
  {id: 'medical-support', name: 'Medical Support'},
];

const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "medMagic - Store";

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product');
        if (!res.ok) {
          throw new Error(`Error fetching products: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once on mount

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  if (loading) {
    return (
      <section className="bg-[#1a1a1a] text-white min-h-screen flex items-center justify-center">
        <p className="text-xl">Products loading</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#1a1a1a] text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <>
      <Head>
        <meta name="description" content="All products you need at your doorstep" />
      </Head>

      <section id="products" className="bg-[#1a1a1a] text-white min-h-screen py-12 px-6">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Products</h3>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition ${activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]'}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product._id?.toString() || product.id} // Use _id from MongoDB, converting ObjectId to string
                className="bg-[#2a2a2a] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <p className="text-blue-400 font-semibold">PKR {product.price?.toFixed(2) || 'N/A'}</p>
                  <Link href={product.link}>
                    <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && !loading && ( // Only show if not loading and no products
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default StorePage;