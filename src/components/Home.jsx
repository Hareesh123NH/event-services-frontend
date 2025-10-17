import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

const features = [
  { id: "features", title: "Event Planning", description: "Comprehensive tools to plan every detail of your event." },
  { id: "ticketing", title: "Ticketing & Registration", description: "Streamlined processes for attendee registration and ticketing." },
  { id: "analytics", title: "Analytics & Reporting", description: "Gain insights with detailed analytics and reports." },
];

const testimonials = [
  { text: "An invaluable tool for our event planning needs.", author: "Client A" },
  { text: "Streamlined our processes and improved efficiency.", author: "Client B" },
];

const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold text-purple-600">Event Services</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {["hero", "features", "testimonials"].map((section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth={true}
                duration={800}
                offset={-80} // adjust for navbar height
                className="cursor-pointer hover:text-purple-600 transition"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            ))}
            <a href="/get-started" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Get Started</a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {["hero", "features", "testimonials"].map((section) => (
                <ScrollLink
                  key={section}
                  onClick={() => setMenuOpen(false)}
                  to={section}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  className="cursor-pointer hover:text-purple-600 transition"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </ScrollLink>
              ))}
              <a href="/get-started" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">Get Started</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.header
        id="hero"
        className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center overflow-hidden pt-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          <img src="/hero-bg.jpg" alt="Events" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 py-32 px-6">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Seamless Event Management
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Plan, execute, and manage your events effortlessly.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/get-started"
            className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </motion.a>
        </div>
      </motion.header>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-purple-50 p-8 rounded-xl shadow"
            >
              <p className="mb-4 italic">"{t.text}"</p>
              <p className="font-semibold">{t.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Event Services Platform</p>
      </footer>
    </div>
  );
};

export default Homepage;
