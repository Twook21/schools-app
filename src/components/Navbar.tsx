"use client";

import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 p-4 z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo dan Nama Sekolah */}
        <a href="#homepage" className="flex items-center space-x-2 animate-fadeIn">
          <Image
            src="/images/tutwuri.png" 
            alt="SMK Rakyat Logo"
            width={32}
            height={32}
            className="dark:filter dark:invert"
          />
          <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            SMK Rakyat
          </span>
        </a>

        {/* Tombol Toggle Menu untuk Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>

        {/* Navigasi Utama (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center animate-fadeIn delay-100">
          <a
            href="#beranda"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
          >
            Tentang
          </a>
          <a
            href="#jurusan"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
          >
            Jurusan
          </a>
          <a
            href="#kontak"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
          >
            Kontak
          </a>
        </div>

        {/* Tombol Login/Register (Desktop) */}
        <div className="hidden md:flex items-center space-x-2 animate-fadeIn delay-200">
          <Link
            href="/auth/login"
            className="py-2 px-4 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-colors text-sm"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="py-2 px-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Navigasi Mobile */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-3 px-4">
          <a
            href="#beranda"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors font-medium text-sm"
          >
            Beranda
          </a>
          <a
            href="#tentang"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors font-medium text-sm"
          >
            Tentang
          </a>
          <a
            href="#jurusan"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors font-medium text-sm"
          >
            Jurusan
          </a>
          <a
            href="#kontak"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition-colors font-medium text-sm"
          >
            Kontak
          </a>
          <hr className="border-gray-200 dark:border-gray-700 my-2" />
          <Link
            href="/auth/login"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 px-4 text-center rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-colors text-sm"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 px-4 text-center rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;