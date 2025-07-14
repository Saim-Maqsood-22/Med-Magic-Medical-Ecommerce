'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SimpleHamburgerNavbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsSmallScreen(window.innerWidth < 768);
      }
    };

    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-[#1a1a1a] text-gray-200 py-4 border-b border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="mr-3 rounded-full border border-gray-700"
              priority
            />
            <span className="text-xl font-bold text-emerald-400">Med Magic</span>
          </Link>
        </div>

        {/* Hamburger Icon (Small Screens) */}
        {isSmallScreen ? (
          <button
            className="text-2xl focus:outline-none hover:text-emerald-400 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {showMenu ? '✕' : '☰'}
          </button>
        ) : (
          /* Navigation Links (Large Screens) */
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="focus:text-emerald-400 transition-colors px-2 py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/store" className="focus:text-emerald-400 transition-colors px-2 py-1">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/about" className="focus:text-emerald-400 transition-colors px-2 py-1">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="focus:text-emerald-400 transition-colors px-2 py-1">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/FAQ" className="focus:text-emerald-400 transition-colors px-2 py-1">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="focus:text-emerald-400 transition-colors px-2 py-1">
                  Select a specialist
                </Link>
              </li>
              <li>
                <Link href="/Your-BMI" className="focus:text-emerald-400 transition-colors px-2 py-1">
                  Calculate BMI
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Mobile Menu (Small Screens) */}
      {isSmallScreen && showMenu && (
        <nav className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 py-3">
          <ul className="flex flex-col items-center space-y-3 px-4">
            <li className="w-full text-center border-b border-gray-800 pb-2">
              <Link href="/" className="block py-2 focus:text-emerald-400 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="w-full text-center border-b border-gray-800 pb-2">
              <Link href="/store" className="block py-2 focus:text-emerald-400 transition-colors" onClick={toggleMenu}>
                Store
              </Link>
            </li>
            <li className="w-full text-center border-b border-gray-800 pb-2">
              <Link href="/about" className="block py-2 focus:text-emerald-400 transition-colors" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li className="w-full text-center border-b border-gray-800 pb-2">
              <Link href="/contact" className="block py-2 focus:text-emerald-400 transition-colors" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
            <li className="w-full text-center border-b border-gray-800 pb-2">
              <Link href="/FAQ" className="block py-2 focus:text-emerald-400 transition-colors" onClick={toggleMenu}>
                FAQ
              </Link>
            </li>
            <li className="w-full text-center border-b border-gray-800 pb-2">
              <Link href="/doctors" className="block py-2 focus:text-emerald-400 transition-colors" onClick={toggleMenu}>
                Select a specialist
              </Link>
            </li>
            <li>
              <Link href="/Your-BMI" className="block py-2 focus:text-emerald-400 transition-colors" onClick={toggleMenu}>
                Calculate BMI
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default SimpleHamburgerNavbar;