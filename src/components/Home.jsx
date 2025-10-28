import React, { useState, useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import Carousel from "./Carousel";

// Enhanced stunning animation styles
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(60px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8) rotate(-5deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-80px) rotate(-10deg);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotate(0deg);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(80px) rotate(10deg);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotate(0deg);
    }
  }
  
  @keyframes bounceFloat {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-15px) rotate(-5deg);
    }
    75% {
      transform: translateY(-8px) rotate(5deg);
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 
        0 0 20px rgba(74, 222, 128, 0.4),
        0 0 40px rgba(74, 222, 128, 0.2),
        inset 0 0 20px rgba(74, 222, 128, 0.1);
    }
    50% {
      box-shadow: 
        0 0 40px rgba(74, 222, 128, 0.6),
        0 0 80px rgba(74, 222, 128, 0.3),
        inset 0 0 30px rgba(74, 222, 128, 0.2);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  @keyframes rotateGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  @keyframes morphShape {
    0%, 100% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
    50% {
      border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }
  }
  
  @keyframes slideUpFade {
    from {
      opacity: 0;
      transform: translateY(80px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes reveal3D {
    from {
      opacity: 0;
      transform: perspective(1000px) rotateX(-20deg) translateY(30px);
    }
    to {
      opacity: 1;
      transform: perspective(1000px) rotateX(0deg) translateY(0);
    }
  }
  
  .fade-in-up {
    animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .fade-in-scale {
    animation: fadeInScale 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  .slide-in-left {
    animation: slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .slide-in-right {
    animation: slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .bounce-float {
    animation: bounceFloat 4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  }
  
  .pulse-glow {
    animation: pulseGlow 3s ease-in-out infinite;
  }
  
  .shimmer-effect {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    background-size: 1000px 100%;
    animation: shimmer 3s infinite;
  }
  
  .rotate-gradient {
    background: linear-gradient(
      -45deg,
      #1f2937,
      #374151,
      #1f2937,
      #111827
    );
    background-size: 400% 400%;
    animation: rotateGradient 8s ease infinite;
  }
  
  .morph-shape {
    animation: morphShape 10s ease-in-out infinite;
  }
  
  .slide-up-fade {
    animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .reveal-3d {
    animation: reveal3D 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .delay-100 {
    animation-delay: 0.1s;
    opacity: 0;
  }
  
  .delay-200 {
    animation-delay: 0.2s;
    opacity: 0;
  }
  
  .delay-300 {
    animation-delay: 0.3s;
    opacity: 0;
  }
  
  .delay-400 {
    animation-delay: 0.4s;
    opacity: 0;
  }
  
  .delay-500 {
    animation-delay: 0.5s;
    opacity: 0;
  }
  
  .delay-600 {
    animation-delay: 0.6s;
    opacity: 0;
  }
  
  .delay-700 {
    animation-delay: 0.7s;
    opacity: 0;
  }
  
  .delay-800 {
    animation-delay: 0.8s;
    opacity: 0;
  }
  
  .scroll-reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
                transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hover-lift-3d {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-style: preserve-3d;
  }
  
  .hover-lift-3d:hover {
    transform: translateY(-20px) scale(1.05) rotateX(5deg);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.5),
      0 0 60px rgba(74, 222, 128, 0.3);
  }
  
  .text-glow {
    text-shadow: 
      0 0 10px rgba(74, 222, 128, 0.5),
      0 0 20px rgba(74, 222, 128, 0.3),
      0 0 30px rgba(74, 222, 128, 0.2);
  }
  
  .gradient-border {
    position: relative;
    background: linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.9));
    border: 2px solid transparent;
  }
  
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: rotateGradient 4s linear infinite;
    background-size: 200% 200%;
  }
  
  .card-shine {
    position: relative;
    overflow: hidden;
  }
  
  .card-shine::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }
  
  @keyframes shine {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }
  
  .parallax-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

function Home() {
  const [text, setText] = useState("");
  const fullText = "Welcome to Karwane Voice of Aima";
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const observerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        setText(fullText.slice(0, index - 1));
        setIndex(index - 1);
      } else if (index === fullText.length && !isDeleting) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (index === 0 && isDeleting) {
        setIsDeleting(false);
      }
    }, isDeleting ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => {
      if (visibleElements.has(el)) {
        el.classList.add('visible');
      }
    });
  }, [visibleElements]);

  return (
    <div className="absolute w-screen min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden overflow-y-auto">
      <style>{animationStyles}</style>
      
      {/* Parallax Background Effect */}
      <div 
        className="parallax-bg"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />
      
      <div className="relative flex flex-col items-center pt-40 pb-32 space-y-32 px-8 lg:px-16 z-10">
        
        {/* Hero Section with Stunning Animations */}
        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-5xl lg:text-6xl font-bold text-white fade-in-up text-glow">
            Karwane Voice Of Aima
          </h1>
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-green-600 bg-clip-text text-transparent fade-in-up delay-200" style={{ backgroundSize: '200% auto' }}>
            / KWOA Travel & Tours
          </h2>
          <div className="flex justify-center items-center gap-4 mt-8 fade-in-scale delay-400">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-xl opacity-50 rounded-full"></div>
              <Phone className="text-green-500 bounce-float relative z-10" size={32} />
            </div>
            <a
              href="tel:+923454001049"
              className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
            >
              +92-345-4001049
            </a>
          </div>
        </div>

      {/* 🔹 Styled Service Section with Typing Animation */}
        <section className="w-full bg-gradient-to-b from-gray-900 to-black py-24 px-8 lg:px-16">
          <div className="max-w-5xl mx-auto bg-gray-800/60 rounded-2xl border border-gray-700 shadow-xl p-10 text-center space-y-8 hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-4xl font-bold text-green-400 h-12">
              {text}
              <span className="text-green-500 animate-pulse">|</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Ziaraat Guide Travel has been a reliable name in the industry. We
              started our business in 2015 and have served Zaireen for more than
              90 groups. With Allah’s and the Imam’s help, hard work, and
              dedication, we have become a trusted name in Pakistan.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-10">
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  Service Times
                </h3>
                <p className="text-gray-300">Monday – Saturday</p>
                <p className="text-gray-300">10:00am – 7:00pm</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  Our Location
                </h3>
                <p className="text-gray-300">
                  LG 54, Latif Center, Gulberg, Lahore
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  Our Contacts
                </h3>
                <p className="text-gray-300">+92-345-4001049</p>
                <p className="text-gray-300">+92-300-9771049</p>
              </div>
            </div>
          </div>
        </section>
        {/* Recent Packages Section */}
        <section className="recent-packages scroll-reveal w-full">
          <div className="w-full bg-gradient-to-b py-24 px-8 lg:px-16">
            <div className="max-w-7xl mx-auto text-center space-y-12">
              <div className="min-h-screen flex flex-col items-center justify-center">
                 <div className="min-h-screen flex flex-col items-center justify-center  p-6">
      <h1 className="text-2xl font-semibold text-white mb-8">
        Two Carousels Side by Side
      </h1>

      {/* Container for both carousels */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
        <Carousel />
        <Carousel />
        <Carousel />
      </div>
    </div>
              </div>
            </div>
          </div>
        </section>
         
  
        <section className="pakages scroll-reveal">
          <h2 className="text-5xl font-bold text-green-400 mb-8 text-glow">
            Recent Packages
          </h2>
        </section>

        {/* Why Choose Section with 3D Effects */}
        <div className="w-full bg-gradient-to-b from-gray-900 to-black py-24 px-8 lg:px-16 scroll-reveal">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <h2 className="text-5xl font-bold text-green-400 mb-8 text-glow">
              Why Choose KWOA
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="p-8 gradient-border rounded-2xl hover-lift-3d slide-in-left delay-100 card-shine">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 text-glow">
                    Trusted Service
                  </h3>
                  <p className="text-gray-300 text-lg">
                    We have years of experience providing safe and reliable
                    Ziaraat and Umrah packages.
                  </p>
                </div>
              </div>
              <div className="p-8 gradient-border rounded-2xl hover-lift-3d fade-in-scale delay-300 card-shine">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 text-glow">
                    Affordable Packages
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Our prices are competitive while ensuring maximum comfort and
                    quality.
                  </p>
                </div>
              </div>
              <div className="p-8 gradient-border rounded-2xl hover-lift-3d slide-in-right delay-500 card-shine">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 text-glow">
                    24/7 Support
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Our dedicated team is available around the clock to assist you
                    on your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <footer className="relative w-full bg-gradient-to-t from-black via-gray-900 to-black text-center py-6 border-t border-green-800/30 mt-10 scroll-reveal z-10">
        <p className="text-gray-400 text-sm tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="text-green-400 font-semibold">Karwane Voice of Aima</span> — All Rights Reserved <br /> <span className="text-green-400 font-semibold">Developed By</span> Team-Dani
        </p>
      </footer>
    </div>
  );
}

export default Home;