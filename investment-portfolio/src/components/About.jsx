import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  const slides = [
    { title: "Quarterly Product Updates", icon: "📰" },
    { title: "Break Packs", icon: "💼" },
    { title: "Exclusive deals", icon: "🎁" }
  ];

  const testimonials = [
    { text: "Portfolio app, not just for crypto! Automated API connections and manual entries with approved brokers. Great insights and control.", author: "Lukasz M.", platform: "AppStore" },
    { text: "Great app for tracking diverse investments, with top-notch customer service. Thanks for resolving app issues!", author: "Alex S.", platform: "Google Play" },
    { text: "I love Evolve they have one of the best for investing Security Evolve is all you need for your Portfolio best platform.", author: "Cathleen Z.", platform: "AppStore" }
  ];

  const footerLinks = {
    Trackers: ["Crypto", "Stocks", "Funds", "Commodities", "Forex"],
    Product: ["Features", "Download", "Web", "Indices"],
    Resources: ["Blog", "Support", "Affiliate program"],
    Company: ["About Evolve", "Careers", "Press Kit"]
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Newsletter Section - Only show if user is not logged in */}
      {!currentUser && (
        <section className="py-16 px-6 bg-gradient-to-br from-blue-900 to-purple-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">JOIN OUR NEWSLETTER</h2>
            <p className="text-gray-300 mb-8 text-lg">Get exclusive insights straight to your mailbox</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
                Sign Up
              </button>
            </form>
            
            <p className="text-gray-400 text-sm mt-4">By clicking Sign Up you're confirming that you agree with our Terms of Service.</p>
          </div>
        </section>
      )}

      {/* Orange Box with Slides */}
      <section className={`py-16 px-6 ${currentUser ? 'pt-20' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-orange-500 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-10"></div>
            
            <div className="relative h-32 flex items-center justify-center">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white text-center"
                  initial={{ opacity: 0, x: index > currentSlide ? 100 : -100 }}
                  animate={{ 
                    opacity: index === currentSlide ? 1 : 0,
                    x: index === currentSlide ? 0 : (index > currentSlide ? 100 : -100)
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-4xl mb-2">{slide.icon}</div>
                  <h3 className="text-xl font-bold">{slide.title}</h3>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by users,<br />
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Awarded by Experts.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Evolve was recognized as the Best Portfolio Tracker of 2024 for its powerful insights, 
              seamless tracking, and intuitive design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-xl">
                <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <h3 className="text-white text-lg font-semibold mb-4">Evolve</h3>
              <p className="text-gray-400 text-sm">© 2025 Evolve. All rights reserved.</p>
            </div>
            
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition text-sm">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Cookie Settings</a>
            </div>
            <p className="text-gray-400 text-sm">Made for investors</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;