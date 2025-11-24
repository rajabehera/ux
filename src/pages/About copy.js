import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    AOS.init({ 
      duration: 1000, 
      easing: 'ease-out-cubic',
      once: true 
    });
  }, []);

  const personalDetails = [
    { label: "Birthday", value: "12 March 1991", icon: "🎂" },
    { label: "Age", value: calculateAge().toString(), icon: "🎯" },
    { label: "Degree", value: "Bachelor of Engineering (IT)", icon: "🎓" },
    { label: "City", value: "Pune, India", icon: "📍" },
    { label: "Phone", value: "+91-8600-820-649", icon: "📱" },
    { label: "Email", value: "rajasbehera@gmail.com", icon: "✉️" },
    { label: "Freelance", value: "Available", icon: "💼" },
  ];

  const experiences = [
    { 
      years: "7+", 
      label: "Years Experience",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      years: "20+", 
      label: "Projects Completed",
      gradient: "from-cyan-500 to-blue-500"
    },
    { 
      years: "10+", 
      label: "Happy Clients",
      gradient: "from-orange-500 to-red-500"
    },
    { 
      years: "100%", 
      label: "Client Satisfaction",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  const expertise = [
    "UI/UX Design",
    "Web Development",
    "Responsive Design",
    "Design Systems",
    "Front-end Development",
    "User Research",
    "Prototyping",
    "Wireframing"
  ];

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-gray-900/50 border-2 border-gray-700/50 p-8 text-center transition-all duration-300 group-hover:border-gray-600 group-hover:bg-gray-900/70">
                    <div 
                      className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent mb-3`}
                    >
                      {exp.years}
                    </div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">
                      {exp.label}
                    </div>
                  </div>
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div data-aos="fade-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl" />
                  <div className="relative w-full aspect-square border-4 border-purple-500/50 overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                    <div className="absolute inset-0 flex items-center justify-center text-9xl">
                      👨‍💻
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-pink-500/30" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-cyan-500/30" />
                </div>
              </div>

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
                      <span 
                        key={index}
                        className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Details Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div data-aos="fade-up">
              <div className="bg-gray-900/50 border-2 border-cyan-500/30 p-12 md:p-16">
                <h3 
                  className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent"
                >
                  PERSONAL DETAILS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {personalDetails.map((detail, index) => (
                    <div 
                      key={index} 
                      className="group"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <div className="flex items-start gap-4 p-6 bg-gray-800/30 border-l-4 border-cyan-500/50 hover:bg-gray-800/50 hover:border-cyan-400 transition-all duration-300">
                        <div className="text-3xl flex-shrink-0">{detail.icon}</div>
                        <div>
                          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-semibold">
                            {detail.label}
                          </p>
                          <p className="text-gray-200 text-base font-medium">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-8" data-aos="fade-up">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    With a passion for creating <span className="text-cyan-400 font-semibold">user-centered designs</span> and a keen eye for detail, I thrive on delivering elegant and effective digital experiences. I am committed to creating meaningful and impactful digital solutions through user research, wireframing, prototyping, and front-end development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div 
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-8"
                data-aos="fade-up"
              >
                <div className="text-5xl mb-4">🎨</div>
                <h4 className="text-2xl font-bold text-white mb-4">Design Philosophy</h4>
                <p className="text-gray-400 leading-relaxed">
                  I believe in creating designs that are not only visually appealing but also solve real user problems with simplicity and elegance.
                </p>
              </div>

              <div 
                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-cyan-500/20 p-8"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="text-5xl mb-4">💻</div>
                <h4 className="text-2xl font-bold text-white mb-4">Development Approach</h4>
                <p className="text-gray-400 leading-relaxed">
                  Writing clean, maintainable code while staying updated with the latest technologies to build performant web applications.
                </p>
              </div>

              <div 
                className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 p-8"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="text-5xl mb-4">🚀</div>
                <h4 className="text-2xl font-bold text-white mb-4">Collaboration Style</h4>
                <p className="text-gray-400 leading-relaxed">
                  Working closely with teams and clients to understand requirements and deliver solutions that exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center" data-aos="zoom-in">
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/30 p-12 md:p-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Let's Work Together
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold uppercase tracking-widest hover:shadow-2xl transition-all duration-300">
                  Get In Touch
                </button>
                <button className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-bold uppercase tracking-widest hover:bg-purple-500/10 transition-all duration-300">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;