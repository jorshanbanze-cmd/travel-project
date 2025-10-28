import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import ZayaratPakage from "./components/ZayaratPakage";
import Umrah from "./components/Umrah";
import Contact from "./components/Contact";
import AshuraOblige from "./components/AshuraOblige";
import Arbyenn from "./components/Arbyenn";
import About from "./components/About";
import Home from "./components/Home"

function AppRouter() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ziaraat-packages" element={<ZayaratPakage />} />
          <Route path="/arbaeen-2026" element={<Arbyenn />} />
          <Route path="/umrah" element={<Umrah />} />
          <Route path="/visas" element={<AshuraOblige />} />
          <Route path="/iran-tourism" element={<AshuraOblige />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/ziaraat-packages", label: "Ziaraat Packages" },
    { path: "/arbaeen-2026", label: "Arbaeen 2026" },
    { path: "/umrah", label: "UMRAH" },
    { path: "/visas", label: "Visas" },
    { path: "/iran-tourism", label: "IRAN Tourism" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md" : "bg-black/80"
      }`}
    >
      <div className="w-full px-8 lg:px-16">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <Link to="/">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-400 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">☪️</span>
              </div>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Karwane Voice</h1>
              <p className="text-xs text-green-500 font-bold tracking-widest">SERVICES</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <button
                  className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-green-500"></span>
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              </Link>
            ))}
            <Link to="/contact">
              <button className="ml-4 px-8 py-3 bg-green-500 text-black font-bold text-base rounded-xl hover:bg-green-400 transform hover:scale-105 transition-all duration-300">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pt-2 pb-6 space-y-2 bg-black/95 backdrop-blur-md border-t border-white/10">
          {navItems.map((item, index) => (
            <Link key={item.path} to={item.path}>
              <button
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-2 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-green-600 to-green-500 text-white"
                    : "text-white hover:bg-white/10"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? "slideIn 0.3s ease-out forwards" : "none",
                }}
              >
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}

export default AppRouter;
