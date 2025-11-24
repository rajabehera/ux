import React, { useState } from 'react';
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUp, MessageCircle, Instagram, Facebook, Youtube, Dribbble } from 'lucide-react';

export default function PortfolioFooter() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  // Custom Behance icon component
  const BehanceIcon = ({ size = 20 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 8h6c1.7 0 3 1.3 3 3s-1.3 3-3 3H3V8z" />
      <path d="M3 14h6.5c1.9 0 3.5 1.6 3.5 3.5S11.4 21 9.5 21H3v-7z" />
      <circle cx="17.5" cy="15.5" r="3.5" />
      <path d="M21 14.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5" />
      <path d="M15 7h6" />
    </svg>
  );

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-purple-400' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-400' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-sky-400' },
    { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-400' },
    { icon: Dribbble, label: 'Dribbble', href: '#', color: 'hover:text-pink-300' },
    { icon: BehanceIcon, label: 'Behance', href: '#', color: 'hover:text-blue-600' },
    { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:text-blue-500' },
    { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:text-red-500' },
    { icon: MessageCircle, label: 'WhatsApp', href: '#', color: 'hover:text-green-400' },
    { icon: Mail, label: 'Email', href: '#', color: 'hover:text-yellow-400' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickMessage = () => {
    if (message) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Raja Behera
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Crafting digital experiences with passion and precision. Let's build something amazing together.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-300">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Message */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-300">Got a Project Idea?</h4>
            <p className="text-gray-400 text-sm">Drop me a quick message and let's discuss how we can bring your vision to life.</p>
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project..."
                rows="3"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300 text-white placeholder-gray-500 resize-none"
              />
              <button
                onClick={handleQuickMessage}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {sent ? '✓ Message Sent!' : 'Send Quick Message'}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social links */}
          <div className="flex flex-wrap gap-4 justify-center">
            {socialLinks.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                onMouseEnter={() => setHoveredIcon(label)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`p-3 bg-gray-900 rounded-full transition-all duration-300 transform hover:scale-110 ${color} ${
                  hoveredIcon === label ? 'rotate-12' : ''
                }`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 animate-pulse" fill="currentColor" />
            <span>© 2025 All rights reserved</span>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {/* <button
        onClick={scrollToTop}
        className="absolute bottom-8 left-8 p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button> */}
    </footer>
  );
}