import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold text-primary">FindMyRentalManager</span>
              <span className="text-2xl font-bold text-gray-700 transition-all group-hover:text-primary">.com</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`font-medium ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className={`font-medium ${location === '/dashboard' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/list-property" 
              className={`font-medium ${location === '/list-property' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              List Your Property
            </Link>
            <Link 
              href="/pricing" 
              className={`font-medium ${location === '/pricing' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Pricing
            </Link>
            <Link 
              href="/resources" 
              className={`font-medium ${location === '/resources' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Resources
            </Link>
            <Link 
              href="/support" 
              className={`font-medium ${location === '/support' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Support
            </Link>
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                href="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link 
                href="/list-property"
                className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/list-property' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeMenu}
              >
                List Your Property
              </Link>
              <Link 
                href="/pricing"
                className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/pricing' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link 
                href="/resources"
                className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/resources' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeMenu}
              >
                Resources
              </Link>
              <Link 
                href="/support"
                className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/support' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeMenu}
              >
                Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
