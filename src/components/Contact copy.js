import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Twitter, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RandomQuote from './Quotes';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [focused, setFocused] = useState('');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: 'Email',
            value: 'rajasbehera@gmail.com',
            href: 'mailto:rajasbehera@gmail.com',
            gradient: 'from-cyan-500 to-blue-500'
        },
        {
            icon: <Phone className="w-6 h-6" />,
            label: 'Phone',
            value: '+91-8600-820-649',
            href: 'tel:+918600820649',
            gradient: 'from-pink-500 to-purple-500'
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            label: 'Location',
            value: 'Pune, India',
            href: '#',
            gradient: 'from-orange-500 to-red-500'
        }
    ];

    const socialLinks = [
        {
            icon: <Github className="w-5 h-5" />,
            label: 'GitHub',
            href: '#',
            color: '#333',
            hoverColor: 'group-hover:text-purple-400'
        },
        {
            icon: <Linkedin className="w-5 h-5" />,
            label: 'LinkedIn',
            href: '#',
            color: '#0077b5',
            hoverColor: 'group-hover:text-blue-400'
        },
        {
            icon: <Twitter className="w-5 h-5" />,
            label: 'Twitter',
            href: '#',
            color: '#1DA1F2',
            hoverColor: 'group-hover:text-sky-400'
        },
        {
            icon: <Instagram className="w-5 h-5" />,
            label: 'Instagram',
            href: '#',
            color: '#E4405F',
            hoverColor: 'group-hover:text-pink-400'
        },
        {
            icon: <Facebook className="w-5 h-5" />,
            label: 'Facebook',
            href: '#',
            color: '#1877F2',
            hoverColor: 'group-hover:text-blue-500'
        },
        {
            icon: <Youtube className="w-5 h-5" />,
            label: 'YouTube',
            href: '#',
            color: '#FF0000',
            hoverColor: 'group-hover:text-red-500'
        },
        {
            icon: <MessageCircle className="w-5 h-5" />,
            label: 'WhatsApp',
            href: '#',
            color: '#25D366',
            hoverColor: 'group-hover:text-green-400'
        },
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm8.5 6.5c1.438 1.75 2.312 3.969 2.438 6.406-2.906-.625-5.562-.625-7.875-.125-.188-.437-.375-.875-.625-1.312 2.719-1.125 4.875-2.688 6.062-4.969zM12 2.188c2.219 0 4.25.812 5.812 2.156-1.062 2.062-3.062 3.5-5.562 4.5-1.625-2.937-3.438-5.25-5.062-6.75C8.437 2.375 10.188 2.188 12 2.188zM5.125 3.125c1.562 1.5 3.375 3.812 5.062 6.812-3.312 1-7.125 1.5-10.125 1.562.562-3.687 2.5-6.875 5.062-9.375zM2.125 12v-.375c3.25-.062 7.375-.625 11-1.75.188.375.375.75.562 1.125-4.5 1.437-7.875 4.5-9.562 7.812C2.75 17.188 2.125 14.688 2.125 12zm11.75 9.688c-2.062 0-3.938-.625-5.562-1.688 1.438-2.937 4.5-5.812 8.75-7.125 1.125 3.062 1.812 6.125 2.062 8.625-1.625.75-3.438 1.188-5.25 1.188zm7.312-2.625c-.25-2.312-.875-5.187-1.938-8.062 2.062-.437 4.375-.375 6.875.188-.625 3.5-2.5 6.5-4.938 7.875z" />
                </svg>
            ),
            label: 'Dribbble',
            href: '#',
            color: '#EA4C89',
            hoverColor: 'group-hover:text-pink-500'
        },
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM3.495 8.717h2.77c.724 0 1.278-.14 1.66-.42.382-.283.575-.73.575-1.343 0-.344-.07-.625-.18-.846-.13-.22-.3-.39-.5-.512-.21-.124-.45-.21-.72-.257-.27-.053-.56-.074-.84-.074H3.495v3.448zm0 2.367v4.075h3.11c.272 0 .541-.028.802-.074.26-.05.495-.14.698-.27.21-.14.382-.33.51-.583.13-.252.19-.58.19-.98 0-.777-.21-1.336-.63-1.677-.42-.34-1-.51-1.732-.51h-2.94l-.007.02zm15.87 3.978c.61.445 1.477.667 2.6.667.82 0 1.523-.2 2.107-.59.587-.39.997-.86 1.233-1.417h3.02c-.487 1.51-1.233 2.582-2.24 3.208-1.007.627-2.22.94-3.64.94-1.01 0-1.92-.15-2.73-.44-.81-.29-1.492-.71-2.052-1.26-.558-.55-.988-1.22-1.29-2.003-.302-.78-.452-1.66-.452-2.64 0-.955.15-1.83.452-2.61.302-.782.732-1.45 1.29-2.003.558-.55 1.24-.97 2.052-1.26.81-.29 1.72-.44 2.73-.44 1.08 0 2.01.19 2.79.56.78.37 1.42.88 1.93 1.52.51.64.88 1.38 1.11 2.21.23.83.32 1.72.27 2.67h-8.97c0 1.093.28 1.94.84 2.54l.03.03zm3.89-7.43c-.48-.36-1.11-.54-1.88-.54-.54 0-.99.09-1.35.27s-.65.39-.87.65c-.22.26-.37.55-.46.86-.09.31-.14.59-.14.84h5.69c-.16-.97-.51-1.71-.99-2.08zm-3.56-5.34h7.69v1.55h-7.69v-1.55z" />
                </svg>
            ),
            label: 'Behance',
            href: '#',
            color: '#1769FF',
            hoverColor: 'group-hover:text-blue-400'
        },
    ];

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

            {/* Grid Pattern */}
            <div className="fixed inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Floating orbs */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="fixed top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-20" data-aos="fade-down">
                    <div className="inline-block mb-6">
                        <div className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 text-sm uppercase tracking-widest mb-3">
                            <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                            Get In Touch
                            <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
                        </div>
                    </div>
                    <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 designer">
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                           LET'S CONNECT 
                        </span>
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        Have a project in mind? Let's create something amazing together.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-20">
                    {/* Contact Form */}
                    <div className="relative" data-aos="fade-right">
                        {/* Glow effect behind form */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-pink-500/5 blur-3xl" />

                        <div className="relative space-y-6">
                            {/* Name Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('name')}
                                    onBlur={() => setFocused('')}
                                    className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-none px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                                    style={{
                                        borderColor: focused === 'name' ? '#06b6d4' : '',
                                        boxShadow: focused === 'name' ? '0 0 30px rgba(6, 182, 212, 0.3)' : ''
                                    }}
                                    placeholder="Your Name"
                                />
                                <div
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                                    style={{ width: focused === 'name' ? '100%' : '0%' }}
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused('')}
                                    className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-none px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                                    style={{
                                        borderColor: focused === 'email' ? '#ec4899' : '',
                                        boxShadow: focused === 'email' ? '0 0 30px rgba(236, 72, 153, 0.3)' : ''
                                    }}
                                    placeholder="Your Email"
                                />
                                <div
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                                    style={{ width: focused === 'email' ? '100%' : '0%' }}
                                />
                            </div>

                            {/* Subject Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('subject')}
                                    onBlur={() => setFocused('')}
                                    className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-none px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                                    style={{
                                        borderColor: focused === 'subject' ? '#a855f7' : '',
                                        boxShadow: focused === 'subject' ? '0 0 30px rgba(168, 85, 247, 0.3)' : ''
                                    }}
                                    placeholder="Subject"
                                />
                                <div
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                                    style={{ width: focused === 'subject' ? '100%' : '0%' }}
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="relative">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused('')}
                                    rows="5"
                                    className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-none px-6 py-4 text-white placeholder-gray-500 focus:outline-none resize-none transition-all duration-300"
                                    style={{
                                        borderColor: focused === 'message' ? '#06b6d4' : '',
                                        boxShadow: focused === 'message' ? '0 0 30px rgba(6, 182, 212, 0.3)' : ''
                                    }}
                                    placeholder="Your Message"
                                />
                                <div
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-300"
                                    style={{ width: focused === 'message' ? '100%' : '0%' }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="group relative w-full md:w-auto px-12 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:shadow-2xl"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Send Message
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8" data-aos="fade-left">
                        {/* Contact Cards */}
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.href}
                                    className="group block relative"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="relative bg-gray-900/30 border-2 border-gray-700/50 p-6 transition-all duration-300 group-hover:border-gray-600 group-hover:bg-gray-900/50">
                                        <div className="flex items-center gap-6">
                                            <div
                                                className={`w-16 h-16 rounded-full bg-gradient-to-r ${info.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <div className="text-white">
                                                    {info.icon}
                                                </div>
                                            </div>

                                            <div className="flex-grow">
                                                <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                                                    {info.label}
                                                </div>
                                                <div className="text-white text-lg font-medium break-all">
                                                    {info.value}
                                                </div>
                                            </div>

                                            <div className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-2 transition-all duration-300">
                                                →
                                            </div>
                                        </div>

                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* CTA Box */}
                        <div
                            className="p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <h4 className="text-2xl font-bold text-white mb-3">
                                Looking for a Designer/Developer?
                            </h4>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                I'm available for freelance projects and full-time opportunities. Let's discuss how we can work together!
                            </p>
                            <button className="px-6 py-3 border-2 border-purple-500 text-purple-400 uppercase text-sm tracking-widest hover:bg-purple-500/10 transition-colors">
                                Download Resume
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="py-12" data-aos="fade-up">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Connect With Me</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto rounded-full" />
                        <p className="text-gray-400 mt-4">Let's connect on social media and stay in touch</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className="group relative"
                                data-aos="zoom-in"
                                data-aos-delay={index * 50}
                            >
                                <div className="bg-gray-900/30 border-2 border-gray-700/50 p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-gray-600 hover:bg-gray-900/50 h-32">
                                    <div className={`text-gray-400 transition-colors duration-300 ${social.hoverColor}`}>
                                        {social.icon}
                                    </div>
                                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                                        {social.label}
                                    </span>
                                </div>
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"
                                    style={{ backgroundColor: social.color }}
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quote Section */}
               
                <RandomQuote/>
            </section>
        </div>
    );
};

export default ContactSection;