import React, { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from '@studio-freight/lenis';
import OrbitalCard from '../components/Orbit';
import Tooltip from '../components/ToolTip';
import { Cake, Target, GraduationCap, MapPin, Phone, Mail, Briefcase, Palette, Laptop, Rocket } from 'lucide-react';
import FollowingPointerDemo from '../components/FollowingPointerDemo';
import { GlowingEffect } from '../components/ui/glowing-effect';

const AboutSection = () => {
  const calculateAge = () => {
    const birthDate = new Date('1991-03-12');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true
    });

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  const personalDetails = [
    { label: "Birthday", value: "12 March 1991", icon: Cake },
    { label: "Age", value: calculateAge().toString(), icon: Target },
    { label: "Degree", value: "Bachelor of Engineering (IT)", icon: GraduationCap },
    { label: "City", value: "Pune, India", icon: MapPin },
    { label: "Phone", value: "+91-8600-820-649", icon: Phone },
    { label: "Email", value: "rajasbehera@gmail.com", icon: Mail },
    { label: "Freelance", value: "Available", icon: Briefcase },
  ];


  const expertise = [
    "UI/UX Design",
    "Web Development",
    "Responsive Design",
    "React Js",
    "Design Systems",
    "Front-end Development",
    "User Research",
    "Next JS",
    "Prototyping",
    "Node JS",
    "Wireframing",
    "Express JS"
  ];

  const randomRotate = useMemo(() => `rotate(${Math.floor(Math.random() * -5) - 5}deg)`, []);


  const [randomLeft, setRandomLeft] = useState("0px");
  const [randomTop, setRandomTop] = useState("0px");

  const updateRandomPosition = () => {
    setRandomLeft(`${Math.floor(Math.random() * 350) + 20}px`, []);
    setRandomTop(`${Math.floor(Math.random() * 500) + 20}px`, []);
    console.log(randomLeft);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

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
      {/* <div className="fixed top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} /> */}
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-7xl w-full">
            <div className="text-center mb-16" data-aos="fade-down">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-sm uppercase tracking-widest mb-3">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                  Get to know me
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
                </div>
              </div>
              <h1
                className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent designer"

              >
                ABOUT ME
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Crafting digital experiences through design and code
              </p>
            </div>

            {/* Stats Cards */}

            <OrbitalCard />
          </div>
        </section>

        {/* Profile Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              {/* <Tooltip text="Raja Behera" customPosition={{
                top: randomTop,
                left: randomLeft,
                transform: randomRotate
              }}> */}
              <FollowingPointerDemo />
                {/* <div data-aos="fade-right" onMouseEnter={updateRandomPosition}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl" />
                    <div className="relative w-full aspect-[calc(4*3+1)/15] border-4 border-purple-500/50 overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">


                      <div className="absolute inset-0 flex items-center justify-center text-9xl">

                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `
                           radial-gradient( rgba(221, 0, 255, 0.01), rgba(0, 38, 255, 0.1)),
                           url('../img/rb2.png')`,
                            backgroundSize: `cover`,
                            backgroundPosition: 'center'
                          }}
                        />


                      </div>

                    </div>
                    
                    <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-pink-500/30" />
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-cyan-500/30" />
                  </div>
                </div> */}
              {/* </Tooltip> */}
              {/* Content */}
              <div data-aos="fade-left">
                <div className="mb-8">
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                  >
                    Sr. UI/UX Designer & Web Developer
                  </h2>

                  <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6" />
                </div>

                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    As a passionate UI/UX Designer and Web Developer with over <span className="text-purple-400 font-semibold">7+ years of experience</span>, I blend creativity and technical expertise to deliver intuitive and engaging user experiences.
                  </p>
                  <p>
                    With a solid foundation in design principles and front-end development, I create seamless interfaces that enhance user satisfaction and drive business success.
                  </p>
                  <p className="text-gray-400">
                    Whether designing wireframes, crafting responsive layouts, or developing interactive prototypes, I am dedicated to transforming ideas into impactful digital solutions.
                  </p>
                </div>

                {/* Expertise Tags */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    
                    {expertise.map((skill, index) => ( 
                      <div className="relative px-4 py-2 rounded-2xl border  md:rounded-3xl bg-purple-500/10 border border-black text-purple-300 text-sm hover:bg-purple-500/20 transition-colors">
                            <GlowingEffect
                              spread={40}
                              glow={true}
                              disabled={false}
                              proximity={64}
                              inactiveZone={0.01} />
                      <span
                        key={index}
                        className=" "
                      >
                        {skill}
                      </span>
                  </div>
                    ))}
                  </div>
                  {/* <GlowingEffectDemo/> */}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Personal Details Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          {/* Animated background particles */}


          <div className="max-w-7xl mx-auto relative z-10">
            <div data-aos="fade-up">
              <div className="bg-gray-900/50 border-2 border-cyan-500/30 p-12 md:p-16 relative overflow-hidden group/container">
                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cyan-400/50 group-hover/container:border-cyan-400 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-cyan-400/50 group-hover/container:border-cyan-400 transition-colors duration-500" />

                {/* Scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-32 animate-scan pointer-events-none" />

                <h3
                  className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent relative inline-block"
                >
                  <span className="relative">
                    PERSONAL DETAILS
                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover/container:w-full transition-all duration-700" />
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {personalDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    return (
                      <div
                        key={index}
                        className="group/card cursor-pointer"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                        onMouseEnter={(e) => {
                          const card = e.currentTarget;
                          const rect = card.getBoundingClientRect();
                          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                        }}
                      >
                        <div className="relative flex items-start gap-4 p-6 bg-gray-800/30 border-l-4 border-cyan-500/50 overflow-hidden transition-all duration-300 group-hover/card:bg-gray-800/70 group-hover/card:border-cyan-400 group-hover/card:shadow-[0_0_30px_rgba(34,211,238,0.3)] group-hover/card:translate-x-2">
                          {/* Glow effect on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-gradient-radial from-cyan-400/10 via-transparent to-transparent" style={{ background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.15), transparent 50%)' }} />

                          {/* Animated icon container */}
                          <div className="flex-shrink-0 relative z-10 transform group-hover/card:scale-110 group-hover/card:rotate-12 transition-transform duration-300">
                            <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                            <Icon className="relative w-8 h-8 text-cyan-400 group-hover/card:text-cyan-300 transition-colors duration-300" />
                          </div>

                          <div className="relative z-10 flex-1">
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-semibold group-hover/card:text-cyan-400 transition-colors duration-300">
                              {detail.label}
                            </p>
                            <p className="text-gray-200 text-base font-medium group-hover/card:text-white transition-colors duration-300">
                              {detail.value}
                            </p>
                          </div>

                          {/* Animated data stream effect */}
                          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 animate-flow" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-700 pt-8 relative" data-aos="fade-up">
                  <div className="absolute -top-px left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-transparent group-hover/container:w-1/3 transition-all duration-1000" />

                  <p className="text-gray-300 text-lg leading-relaxed relative">
                    With a passion for creating <span className="text-cyan-400 font-semibold relative inline-block group/highlight cursor-pointer">
                      <span className="relative z-10">user-centered designs</span>
                      <span className="absolute inset-0 bg-cyan-400/10 -skew-x-12 scale-0 group-hover/highlight:scale-100 transition-transform duration-300" />
                    </span> and a keen eye for detail, I thrive on delivering elegant and effective digital experiences. I am committed to creating meaningful and impactful digital solutions through user research, wireframing, prototyping, and front-end development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
    <section className="py-30 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Approach
          </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto rounded-full" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three core principles that guide my work and define how I create exceptional digital experiences
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-8 rounded-lg hover:border-purple-500/40 transition-all duration-300"
            data-aos="fade-up"
          >
            <div className="text-5xl mb-4">
              <Palette className="w-12 h-12 text-purple-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">Design Philosophy</h4>
            <p className="text-gray-400 leading-relaxed">
              I believe in creating designs that are not only visually appealing but also solve real user problems with simplicity and elegance.
            </p>
          </div>

          <div
            className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-cyan-500/20 p-8 rounded-lg hover:border-cyan-500/40 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-5xl mb-4">
              <Laptop className="w-12 h-12 text-cyan-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">Development Approach</h4>
            <p className="text-gray-400 leading-relaxed">
              Writing clean, maintainable code while staying updated with the latest technologies to build performant web applications.
            </p>
          </div>

          <div
            className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 p-8 rounded-lg hover:border-orange-500/40 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-5xl mb-4">
              <Rocket className="w-12 h-12 text-orange-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">Collaboration Style</h4>
            <p className="text-gray-400 leading-relaxed">
              Working closely with teams and clients to understand requirements and deliver solutions that exceed expectations.
            </p>
          </div>
        </div>
      </div>
    </section>

        {/* CTA Section */}
         <div 
              className="flex-shrink-0 flex items-center justify-center"
              style={{  height: '100vh' }}
            >
              <div className="text-center px-8">
                <h3 className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 font-serif designer">
                  LET'S CREATE
                </h3>
                <p className="text-gray-400 text-2xl mb-8">Something Amazing Together</p>
                <div className="flex gap-4 justify-center">
                  <div className="px-6 py-3 border border-cyan-400/50 text-cyan-400 text-sm uppercase tracking-widest hover:bg-cyan-400/10 transition-colors">
                    View Projects
                  </div>
                  <div className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Get In Touch
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default AboutSection;