"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Spotlight } from './ui/spotlight-new';
import { Spotlight2 } from './ui/Spotlight';

interface NavigationItem {
  title: string;
  path: string;
}

interface FUIHeroSectionWithImageProps {
  title: string;
  description: string;
  logoSrc: string;
  newsLink: string;
  navigation: NavigationItem[];
}

const FUIHeroSectionWithImage = ({
    title,
    description,
    logoSrc,
    newsLink,
    navigation,
  }: FUIHeroSectionWithImageProps) => {
    const [state, setState] = useState(false);
  
    // ... (keep existing useEffect and click handler)
  
    const Brand = () => (
      <div className="flex items-center justify-between py-4 md:py-0">
        <a href="#">
          <img
            src={logoSrc}
            className="rounded-full"
            width={50}
            height={50}
            alt="Logo"
          />
        </a>
        <div className="md:hidden">
          <button
            className="menu-btn text-purple-900 dark:text-white hover:opacity-75"
            onClick={() => setState(!state)}
            aria-label="Toggle navigation"
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  
    return (
      <div className="relative">
         <div
      className="absolute inset-0 blur-xl h-[580px]"
      style={{
        background:
          'linear-gradient(143.6deg, rgba(245, 243, 255, 0) 20.79%, rgba(147, 51, 234, 0.26) 40.92%, rgba(245, 243, 255, 0) 70.35%)',
      }}
    ></div>
        <div className="relative">
          <header>
            <nav className="max-w-screen-xl mx-auto px-4 md:px-8">
              {/* Mobile header */}
              <div className="md:hidden py-4">
                <Brand />
              </div>
  
              {/* Desktop navigation */}
              <div className={`hidden md:flex items-center justify-between py-4 ${state ? 'block' : 'hidden'}`}>
                <Brand />
                
                <div className="flex-1 flex items-center justify-between">
                  <ul className="flex items-center space-x-6 rounded-full bg-purple-50 dark:bg-zinc-800/10 border border-purple-200 dark:border-zinc-800 shadow-lg dark:shadow-zinc-800/5 px-6 py-2">
                    {navigation.map((item, idx) => (
                      <li key={idx} className="hover:text-purple-600 dark:hover:text-white transition-colors">
                        <a href={item.path} className="block px-3 py-2">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
  
                  <div className="flex items-center gap-4 ml-6">
                    <a
                      href="/auth/login"
                      className="flex items-center gap-1 px-4 py-2 text-purple-600 dark:text-white border border-purple-200 dark:border-white/10 rounded-full hover:bg-purple-600 hover:text-white transition-all"
                    >
                      Sign in
                      <ChevronRight className="w-5 h-5" />
                    </a>
                    <ModeToggle />
                  </div>
                </div>
              </div>
  
              {/* Mobile menu */}
              <div className={`md:hidden absolute top-full inset-x-0 bg-purple-50 dark:bg-zinc-800 shadow-lg rounded-xl mx-2 mt-2 ${
                state ? 'block' : 'hidden'
              }`}>
                <div className="px-4 py-6">
                  <ul className="space-y-4">
                    {navigation.map((item, idx) => (
                      <li key={idx} className="hover:text-purple-600 dark:hover:text-white transition-colors">
                        <a href={item.path} className="block px-4 py-2">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <a
                      href="/auth/login"
                      className="flex items-center justify-center gap-1 px-4 py-3 text-purple-600 dark:text-white border border-purple-200 dark:border-white/10 rounded-full hover:bg-purple-600 hover:text-white transition-all"
                    >
                      Sign in
                      <ChevronRight className="w-5 h-5" />
                    </a>
                    <div className="flex justify-center">
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <section>
        <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-purple-900 dark:text-white overflow-hidden md:px-8 md:flex justify-center items-center">
          <div className="flex-none space-y-5 max-w-xl">
            <h1 className="text-purple-900 dark:text-white tracking-tight max-w-md md:max-w-3xl text-4xl md:text-5xl tracking-tighter mr-auto lg:text-6xl font-geist font-normal">
              {title}
            </h1>
            <p className="text-purple-700 dark:text-gray-300">{description}</p>
            <div className="flex items-center gap-x-3 sm:text-sm">
              <a
                href="/auth/register"
                className="flex items-center justify-center gap-x-1 py-3 px-4 text-white dark:text-black bg-purple-600 dark:bg-white hover:bg-purple-700 dark:hover:bg-gray-100 font-medium rounded-full transition-colors md:inline-flex"
              >
                Get started
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center gap-x-1 py-4 px-4 text-purple-600 dark:text-white hover:text-purple-700 dark:hover:text-gray-300 font-medium duration-150 md:inline-flex"
              >
                Contact sales
              </a>
            </div>
          </div>
        </div>
      </section>
        </div>
      </div>
    );
  };
  
  export default FUIHeroSectionWithImage;