import React from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-rose-600 text-white flex flex-col">
      <div className="flex-grow"></div> {/* Spacer to push content */}
      <div className="bg-rose-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6" />
                <span className="text-2xl font-bold">StoryHub</span>
              </div>
              <p className="text-rose-100">
                Where stories come alive and imagination knows no bounds.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-rose-100 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-rose-100 hover:text-white">
                    Explore Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-rose-100 hover:text-white">
                    Write Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-rose-100 hover:text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Genres</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-rose-100 hover:text-white">
                    Fantasy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-rose-100 hover:text-white">
                    Adventure
                  </a>
                </li>
                <li>
                  <a href="#" className="text-rose-100 hover:text-white">
                    Mystery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-rose-100 hover:text-white">
                    Science Fiction
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-amber-200">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-amber-200">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-amber-200">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-amber-200">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-rose-400 mt-8 pt-8 text-center text-rose-100">
            <p>&copy; {new Date().getFullYear()} StoryHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
