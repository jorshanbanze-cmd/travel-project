import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  const [text, setText] = useState("");
  const fullText = "Welcome to Karwane Voice of Aima";
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        setText(fullText.slice(0, index - 1));
        setIndex(index - 1);
      } else if (index === fullText.length && !isDeleting) {
        // Wait before starting to delete
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (index === 0 && isDeleting) {
        // Wait before typing again
        setIsDeleting(false);
      }
    }, isDeleting ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <div className="absolute w-screen min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden overflow-y-auto">
      <div className="relative flex flex-col items-center pt-40 pb-32 space-y-32 px-8 lg:px-16">
        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-5xl lg:text-6xl font-bold text-white">
            Karwane Voice Of Aima
          </h1>
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            / KWOA Travel & Tours
          </h2>
          <div className="flex justify-center items-center gap-4 mt-8">
            <Phone className="text-green-500 animate-bounce" size={32} />
            <a
              href="tel:+923454001049"
              className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
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

        {/* 🔹 Why Choose Section */}
        <div className="w-full bg-gradient-to-b from-gray-900 to-black py-24 px-8 lg:px-16">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <h2 className="text-5xl font-bold text-green-400 mb-8">
              Why Choose KWOA
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="p-8 bg-gray-800/60 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Trusted Service
                </h3>
                <p className="text-gray-300 text-lg">
                  We have years of experience providing safe and reliable
                  Ziaraat and Umrah packages.
                </p>
              </div>
              <div className="p-8 bg-gray-800/60 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Affordable Packages
                </h3>
                <p className="text-gray-300 text-lg">
                  Our prices are competitive while ensuring maximum comfort and
                  quality.
                </p>
              </div>
              <div className="p-8 bg-gray-800/60 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">
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
      <footer className="w-full bg-gradient-to-t from-black via-gray-900 to-black text-center py-6 border-t border-green-800/30 mt-10">
  <p className="text-gray-400 text-sm tracking-wide">
    © {new Date().getFullYear()}{" "}
    <span className="text-green-400 font-semibold">Karwane Voice of Aima</span> — All Rights Reserved
  </p>
</footer>
    </div>
  );
  
}

export default Home