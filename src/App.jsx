import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#111111] flex flex-col items-center justify-center z-50">
      {/* Simple MP text */}
      <div className="mb-8">
        <span className="text-6xl font-bold font-inter text-white">MP</span>
      </div>

      {/* Simple progress bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full mb-4">
        <div
          className="h-full bg-white rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <span className="text-white text-xl font-inter">{progress}%</span>
    </div>
  );
}

function GridBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      });
    };

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY;
      const progress = (currentProgress / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-all duration-300"
      style={{
        opacity: Math.max(0.03 - scrollProgress * 0.0003, 0.01),
        backgroundImage: `linear-gradient(rgba(59, 130, 246, ${
          scrollProgress > 50 ? "0.1" : "0.3"
        }) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(59, 130, 246, ${
                           scrollProgress > 50 ? "0.1" : "0.3"
                         }) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        filter: "blur(0.5px)",
      }}
    />
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY;
      const progress = (currentProgress / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can add your form submission logic (e.g., sending to a backend)
    console.log("Form submitted:", formData);

    // Show success toast
    toast.success("Message sent successfully!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#111111] text-white relative overflow-hidden">
      <Toaster position="bottom-right" />
      <GridBackground />
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 fixed w-full top-0 z-50">
        <a
          href="#home"
          className="text-2xl font-bold font-inter hover:opacity-70 transition-opacity relative group"
        >
          MP
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <div className="space-x-12 font-inter">
          <a href="#home" className="text-xl relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#skills" className="text-xl relative group">
            Skills
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#projects" className="text-xl relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-xl relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pt-12 mb-32"
      >
        <img
          src="/main.png"
          alt="Madan Pandey"
          className="w-64 h-64 rounded-full mb-8 object-cover"
        />
        <h1 className="text-6xl font-bold mb-6 font-inter">Madan Pandey</h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-8">
          A highly motivated Frontend Developer with expertise in Frontend
          technologies like HTML, CSS, JavaScript, React, and Tailwind CSS.
          Experienced in building responsive, user-friendly web applications
          with modern frameworks and design systems. Additionally skilled in
          backend technologies including Python and MySQL, with knowledge of
          Machine Learning concepts and applications. Passionate about creating
          seamless user experiences and writing clean, maintainable code.
        </p>
        <a
          href="./Madan-Pandey-Resume.pdf"
          download
          className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Download Resume</span>
        </a>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 mb-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 font-inter">Skills</h2>

          {/* Frontend Skills */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-300">
              Frontend Development
            </h3>
            <div className="space-y-6">
              <SkillBar name="HTML" duration="12 months" progress={90} />
              <SkillBar name="CSS" duration="12 months" progress={85} />
              <SkillBar name="JavaScript" duration="3 months" progress={25} />
              <SkillBar name="React" duration="3 months" progress={25} />
            </div>
          </div>

          {/* Other Technical Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-300">
              Other Technical Skills
            </h3>
            <div className="space-y-6">
              <SkillBar name="Python" duration="4 months" progress={35} />
              <SkillBar name="MySQL" duration="4 months" progress={30} />
              <SkillBar
                name="Machine Learning"
                duration="3 months"
                progress={25}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 font-inter">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProjectCard
              title="LMS"
              description="A full end website that helps in creating and enhancing music from anywhere and anytime."
              url="#"
            />
            <ProjectCard
              title="ConnectPC"
              description="A e-commerce website which helps you customize pc according to your needs and demands."
              url="#"
            />
            <ProjectCard
              title="Portfolio"
              description="A modern, responsive portfolio website built with React and Tailwind CSS."
              url="#"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 font-inter">Contact</h2>
          <div className="bg-[#0a0a0a] p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-inter mb-4">Get in Touch</h3>
                  <p className="text-gray-400 text-lg">
                    Feel free to reach out for collaborations, opportunities, or
                    just a friendly chat.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:pmadan466@gmail.com"
                      className="text-lg text-gray-400 hover:text-white transition-colors"
                    >
                      pmadan466@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-lg text-gray-400">
                      Kadhaghari, Kathmandu
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full p-3 bg-[#151515] rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full p-3 bg-[#151515] rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                      rows="4"
                      className="w-full p-3 bg-[#151515] rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="text-3xl font-bold font-inter">MP</div>
              <p className="text-gray-400">
                Building digital experiences with passion and precision.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-inter">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="#skills"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-inter">Contact Info</h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="mailto:pmadan466@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  pmadan466@gmail.com
                </a>
                <p className="text-gray-400">Kadhaghari, Kathmandu</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-inter">Follow Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/madanpandey1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <img src="/github.svg" alt="GitHub" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 my-8"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Madan Pandey. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Designed & Built with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Skill Bar Component
function SkillBar({ name, duration, progress }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium">{name}</span>
        <span className="text-gray-400">{duration}</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full">
        <div
          className="h-full bg-white rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

// Updated Project Card Component
function ProjectCard({ title, description, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group cursor-pointer relative z-10"
    >
      <div className="p-8 bg-[#0a0a0a] rounded-lg transition-all duration-300 hover:bg-[#151515]">
        <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-300 font-inter">
          {title}
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      </div>
    </a>
  );
}

export default App;
