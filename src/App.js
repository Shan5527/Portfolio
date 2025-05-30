import React, { useState, useEffect, useRef } from 'react';
import { Facebook, Instagram, Linkedin, Github, Twitter, Phone, Mail, MapPin, Menu, X, ChevronLeft, ChevronRight, Download, Send, Settings, Sun, Moon, Briefcase, User, Code, Award, MessageSquare, Star, CheckCircle, ExternalLink, Package, GitBranch, TerminalSquare, Server, Cloud } from 'lucide-react';

// Placeholder for assets - replace with your actual paths or URLs
const ASSETS = {
  logo: 'https://placehold.co/100x40/6c63ff/white?text=ShanmugapriyanM',
  profileImage: 'https://placehold.co/400x400/e0e0e0/333?text=Shanmugapriyan+M',
  skillsImage: 'https://placehold.co/400x350/e0e0e0/333?text=DevOps+Tools',
  cv: '#',
  certificates: [
    { id: 0, name: 'DevOps Fundamentals - Coursera', img: 'https://placehold.co/600x400/cccccc/333?text=DevOps+Cert' },
    { id: 1, name: 'Docker for Beginners - LinkedIn Learning', img: 'https://placehold.co/600x400/cccccc/333?text=Docker+Cert' },
    { id: 2, name: 'Kubernetes Essentials - Coursera', img: 'https://placehold.co/600x400/cccccc/333?text=K8s+Cert' },
    { id: 3, name: 'Python for Automation - LinkedIn Learning', img: 'https://placehold.co/600x400/cccccc/333?text=Python+Cert' },
    { id: 4, name: 'GoLang Basics - Coursera', img: 'https://placehold.co/600x400/cccccc/333?text=GoLang+Cert' },
    { id: 5, name: 'CI/CD with GitHub Actions - LinkedIn Learning', img: 'https://placehold.co/600x400/cccccc/333?text=CI/CD+Cert' },
  ]
};

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasIntersected]);

  return [ref, isIntersecting, hasIntersected];
};

// Floating particles background
const FloatingParticles = ({ theme }) => {
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className={`absolute rounded-full opacity-20 animate-pulse ${
        theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-300'
      }`}
      style={{
        width: Math.random() * 8 + 4 + 'px',
        height: Math.random() * 8 + 4 + 'px',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's',
        animationDuration: (Math.random() * 3 + 2) + 's'
      }}
    />
  ));

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>;
};

// SVG Components with enhanced animations
const HomeSVG = ({ isVisible }) => (
  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-2xl transform transition-all duration-1000 ${
    isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-95 rotate-3 opacity-0'
  }`}>
    <div className="relative">
      <img 
        src="https://placehold.co/500x400/e0e0e0/3f3d56?text=Aspiring+DevOps" 
        alt="Aspiring DevOps Engineer Illustration" 
        className={`max-w-full h-auto rounded-lg transition-all duration-1000 ${
          isVisible ? 'filter-none' : 'filter blur-sm'
        }`} 
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-lg transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  </div>
);

const AboutSVG = ({ isVisible }) => (
  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-2xl transform transition-all duration-1000 delay-300 ${
    isVisible ? 'scale-100 -rotate-2 opacity-100' : 'scale-90 rotate-2 opacity-0'
  }`}>
    <img 
      src="https://placehold.co/450x350/e0e0e0/3f3d56?text=Student+Profile" 
      alt="Student Profile Illustration" 
      className="max-w-full h-auto rounded-lg" 
    />
  </div>
);

const SkillsSVG = ({ isVisible }) => (
  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-2xl transform transition-all duration-1000 delay-500 ${
    isVisible ? 'scale-100 rotate-1 opacity-100' : 'scale-95 -rotate-1 opacity-0'
  }`}>
    <img 
      src={ASSETS.skillsImage} 
      alt="DevOps Tools Graphic" 
      className="max-w-full h-auto rounded-lg" 
    />
  </div>
);

// Enhanced Header with scroll effects
const Header = ({ onNavigate, theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? `shadow-xl backdrop-blur-md ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'}` 
        : `shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`
    } ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => onNavigate(e, '#home')} 
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform duration-300"
        >
          Shanmugapriyan M
        </a>
        <div className="hidden md:flex space-x-4 items-center">
          {navLinks.map((link, index) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => onNavigate(e, link.href)} 
              className={`hover:text-indigo-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                theme === 'dark' ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-180"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleTheme} 
            className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="focus:outline-none transition-transform duration-300 hover:scale-110"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu with slide animation */}
      <div className={`md:hidden absolute top-full left-0 right-0 shadow-lg py-2 transition-all duration-500 transform ${
        menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${theme === 'dark' ? 'bg-gray-800/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'}`}>
        {navLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => { onNavigate(e, link.href); setMenuOpen(false); }}
            className={`block px-6 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-all duration-300 transform hover:translate-x-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: menuOpen ? `slideInLeft 0.5s ease-out ${index * 100}ms both` : 'none'
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
};

// Enhanced Home Component
const Home = ({ onNavigate, theme }) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();
  const [textIndex, setTextIndex] = useState(0);
  const roles = ['DevOps Engineer', 'Cloud Enthusiast', 'Automation Expert', 'Tech Innovator'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref}
      id="home" 
      className={`min-h-screen flex items-center pt-20 md:pt-0 transition-colors duration-300 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 text-white' : 'bg-gradient-to-br from-gray-50 via-blue-50/50 to-indigo-50/50 text-gray-800'
      }`}
    >
      <FloatingParticles theme={theme} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`transform transition-all duration-1000 ${
            hasIntersected ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, <br />I'm <span className="text-indigo-600 dark:text-indigo-400 animate-pulse">Shanmugapriyan M</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Aspiring {roles[textIndex]}
              </span>
            </h1>
            <button
              onClick={(e) => onNavigate(e, '#contact')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl duration-300 animate-bounce"
            >
              Contact Me
            </button>
            <div className="mt-8 flex space-x-4">
              {[
                { href: "https://www.facebook.com/", icon: <Facebook size={28}/>, label: "Facebook", color: "hover:text-blue-600" },
                { href: "https://www.instagram.com/day_dreamer._.55", icon: <Instagram size={28}/>, label: "Instagram", color: "hover:text-pink-600" },
                { href: "https://www.linkedin.com/mspriyan/", icon: <Linkedin size={28}/>, label: "LinkedIn", color: "hover:text-blue-700" },
                { href: "https://github.com/msp5527", icon: <Github size={28}/>, label: "Github", color: "hover:text-gray-900 dark:hover:text-white" },
              ].map((social, index) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label} 
                  className={`transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 ${social.color} ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className={`mt-8 md:mt-0 transform transition-all duration-1000 delay-500 ${
            hasIntersected ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <HomeSVG isVisible={hasIntersected} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced About Component
const About = ({ onNavigate, theme }) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();

  return (
    <section 
      ref={ref}
      id="about" 
      className={`py-16 md:py-24 transition-colors duration-300 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 text-gray-300' : 'bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-700'
      }`}
    >
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl font-bold text-center mb-12 transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`w-full max-w-md mx-auto transform transition-all duration-1000 delay-300 ${
            hasIntersected ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}>
            <AboutSVG isVisible={hasIntersected} />
          </div>
          <div className={`transform transition-all duration-1000 delay-600 ${
            hasIntersected ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
              I'm Shanmugapriyan M
            </h3>
            <div className="space-y-4">
              {[
                "Welcome to my portfolio! I am a passionate and driven student currently honing my skills to become a DevOps Engineer. I am fascinated by the intersection of software development and IT operations, and I'm dedicated to learning technologies that streamline and automate the software lifecycle.",
                "My journey involves continuous learning and hands-on practice with key DevOps tools and practices. I am building a strong foundation in areas like containerization, orchestration, CI/CD pipelines, and scripting. I believe in the power of collaboration and efficient workflows to deliver high-quality software.",
                "I am actively seeking opportunities where I can contribute my enthusiasm, apply my developing skills, and learn from experienced professionals in a real-world DevOps environment. Explore my portfolio to see the skills I'm cultivating and the certifications I've earned on my path to becoming a DevOps professional."
              ].map((text, index) => (
                <p 
                  key={index}
                  className={`leading-relaxed transform transition-all duration-1000 ${
                    hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${800 + index * 200}ms` }}
                >
                  {text}
                </p>
              ))}
            </div>
            <div className={`flex space-x-4 mt-6 transform transition-all duration-1000 ${
              hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '1400ms' }}>
              <a 
                href={ASSETS.cv} 
                download 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl duration-300 inline-flex items-center"
              >
                <Download size={20} className="mr-2"/> Download CV
              </a>
              <button
                onClick={(e) => onNavigate(e, '#contact')}
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl duration-300 inline-flex items-center"
              >
                <MessageSquare size={20} className="mr-2"/> Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Skills Component with animated progress bars
const SkillItem = ({ name, percentage, icon, theme, delay, isVisible }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setCurrentPercentage((prev) => {
            if (prev >= percentage) {
              clearInterval(interval);
              return percentage;
            }
            return prev + 2;
          });
        }, 30);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage, delay]);

  return (
    <div className={`mb-6 transform transition-all duration-1000 ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
    }`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          {icon && React.cloneElement(icon, { 
            size: 20, 
            className: `mr-2 transition-colors duration-300 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}` 
          })}
          <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{name}</span>
        </div>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
          {currentPercentage}%
        </span>
      </div>
      <div className={`w-full rounded-full h-2.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-lg"
          style={{ width: `${currentPercentage}%` }}
        />
      </div>
    </div>
  );
};

const Skills = ({ theme }) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();
  
  const skillsData = [
    { name: 'Docker', percentage: 85, icon: <Package /> },
    { name: 'Kubernetes', percentage: 80, icon: <Server /> },
    { name: 'GitHub CI/CD', percentage: 80, icon: <GitBranch /> },
    { name: 'GoLang', percentage: 70, icon: <Code /> },
    { name: 'Python (Scripting)', percentage: 75, icon: <Code /> },
    { name: 'Linux Fundamentals', percentage: 70, icon: <TerminalSquare /> },
  ];

  return (
    <section 
      ref={ref}
      id="skills" 
      className={`py-16 md:py-24 transition-colors duration-300 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900/10 to-blue-900/10 text-gray-300' : 'bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 text-gray-700'
      }`}
    >
      <FloatingParticles theme={theme} />
      <div className="container mx-auto px-6 relative z-10">
        <h2 className={`text-3xl font-bold text-center mb-12 transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          My Developing Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {skillsData.map((skill, index) => 
              <SkillItem 
                key={skill.name} 
                {...skill} 
                theme={theme} 
                delay={index * 200}
                isVisible={hasIntersected}
              />
            )}
          </div>
          <div className={`w-full max-w-md mx-auto transform transition-all duration-1000 delay-500 ${
            hasIntersected ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <SkillsSVG isVisible={hasIntersected} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Certificates Component
const Certificates = ({ theme }) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCertId, setCurrentCertId] = useState(0);

  const openModal = (id) => {
    setCurrentCertId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigateModal = (direction) => {
    setCurrentCertId(prevId => {
      const newId = prevId + direction;
      if (newId < 0) return ASSETS.certificates.length - 1;
      if (newId >= ASSETS.certificates.length) return 0;
      return newId;
    });
  };
  
  const currentCertificate = ASSETS.certificates[currentCertId];

  return (
    <section 
      ref={ref}
      id="certificates" 
      className={`py-16 md:py-24 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 text-gray-300' : 'bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-700'
      }`}
    >
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl font-bold text-center mb-12 transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          My Certifications
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ASSETS.certificates.map((cert, index) => (
            <div
              key={cert.id}
              className={`rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
                hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${theme === 'dark' ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-white'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => openModal(cert.id)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={cert.img} 
                  alt={cert.name} 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className={`font-semibold text-lg transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {cert.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {modalOpen && currentCertificate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
          <div className={`rounded-lg shadow-2xl max-w-3xl w-full relative transition-all duration-500 transform scale-100 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <img 
              src={currentCertificate.img} 
              alt={currentCertificate.name} 
              className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg" 
            />
            <p className={`text-center py-3 font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              {currentCertificate.name}
            </p>
            <button 
              onClick={closeModal} 
              className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                theme === 'dark' ? 'text-gray-300 bg-gray-700/80 hover:bg-gray-600' : 'text-gray-600 bg-gray-100/80 hover:bg-gray-200'
              }`}
            >
              <X size={24} />
            </button>
            <button 
              onClick={() => navigateModal(-1)} 
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                theme === 'dark' ? 'text-gray-300 bg-gray-700/80 hover:bg-gray-600' : 'text-gray-600 bg-gray-100/80 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={() => navigateModal(1)} 
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                theme === 'dark' ? 'text-gray-300 bg-gray-700/80 hover:bg-gray-600' : 'text-gray-600 bg-gray-100/80 hover:bg-gray-200'
              }`}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// Enhanced Contact Component
const Contact = ({ theme }) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setIsSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <section 
      ref={ref}
      id="contact" 
      className={`py-16 md:py-24 transition-colors duration-300 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 text-gray-300' : 'bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 text-gray-700'
      }`}
    >
      <FloatingParticles theme={theme} />
      <div className="container mx-auto px-6 relative z-10">
        <h2 className={`text-3xl font-bold text-center mb-12 transform transition-all duration-1000 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Contact Me
        </h2>
        <form 
          onSubmit={handleSubmit} 
          className={`max-w-lg mx-auto transform transition-all duration-1000 delay-300 ${
            hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="mb-4">
            <label 
              htmlFor="name" 
              className={`block mb-2 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Name
            </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Your Name" 
              required 
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 transform focus:scale-105 ${
                theme === 'dark' ? 'bg-gray-700/80 backdrop-blur-sm border-gray-600 text-white placeholder-gray-400' : 'bg-white/80 backdrop-blur-sm border-gray-300 text-gray-800 placeholder-gray-500'
              }`} 
            />
          </div>
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className={`block mb-2 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Email
            </label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Your Email" 
              required 
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 transform focus:scale-105 ${
                theme === 'dark' ? 'bg-gray-700/80 backdrop-blur-sm border-gray-600 text-white placeholder-gray-400' : 'bg-white/80 backdrop-blur-sm border-gray-300 text-gray-800 placeholder-gray-500'
              }`} 
            />
          </div>
          <div className="mb-6">
            <label 
              htmlFor="message" 
              className={`block mb-2 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Message
            </label>
            <textarea 
              name="message" 
              id="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows="5" 
              placeholder="Your Message" 
              required 
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 transform focus:scale-105 ${
                theme === 'dark' ? 'bg-gray-700/80 backdrop-blur-sm border-gray-600 text-white placeholder-gray-400' : 'bg-white/80 backdrop-blur-sm border-gray-300 text-gray-800 placeholder-gray-500'
              }`}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl duration-300 flex items-center justify-center"
          >
            <Send size={20} className="mr-2"/> Send Message
          </button>
          {isSent && (
            <p className={`mt-4 text-center font-medium animate-bounce ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>
              Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

// Enhanced Footer Component
const Footer = ({ theme }) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();
  
  const contactItems = [
    { icon: <Phone size={18}/>, text: "+91 XXXXXXXXXX", href: "tel:+91XXXXXXXXXX", color: "hover:text-green-500" },
    { icon: <MapPin size={18}/>, text: "Your City", href: "#", color: "hover:text-red-500" }, 
    { icon: <Mail size={18}/>, text: "your.email@example.com", href: "mailto:your.email@example.com", color: "hover:text-blue-500" },
    { icon: <Github size={18}/>, text: "YourGitHub", href: "https://github.com/YourGitHub", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: <Linkedin size={18}/>, text: "YourLinkedIn", href: "https://www.linkedin.com/in/YourLinkedIn", color: "hover:text-blue-700" },
  ];

  return (
    <footer 
      ref={ref}
      className={`py-12 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-gray-400' : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 text-gray-600'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8 text-sm">
          {contactItems.map((item, index) => (
            <a 
              key={item.text} 
              href={item.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center space-x-2 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${item.color} ${
                hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.icon}
              <span>{item.text}</span>
            </a>
          ))}
        </div>
        <p className={`text-center text-sm transform transition-all duration-1000 delay-500 ${
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          Created By Shanmugapriyan M | © {new Date().getFullYear()} All Copyrights reserved
        </p>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleNavigation = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  
  return (
    <div className={`font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      <Header onNavigate={handleNavigation} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Home onNavigate={handleNavigation} theme={theme} />
        <About onNavigate={handleNavigation} theme={theme} />
        <Skills theme={theme} />
        <Certificates theme={theme} />
        <Contact theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
