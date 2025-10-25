import { motion } from "framer-motion";
import HomeNav from "./HomeNav";
import { useThemeClasses } from "./theme/themeClasses";

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

  const { pageBg, cardBg, sectionBg, accentBg } = useThemeClasses();

  return (
    <div className={`font-sans ${pageBg}`}>

      <HomeNav />

      {/* Hero Section */}
      <motion.header
        id="hero"
        className={`relative ${accentBg} text-white text-center overflow-hidden pt-24`}
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
            href="/dashboard"
            className={`font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition ${theme === "dark" ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-purple-600"}`}
          >
            Get Started
          </motion.a>
        </div>
      </motion.header>

      {/* Features Section */}
      <section id="features" className={`py-20 px-6 ${sectionBg} text-center`}>
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
              className={`p-8 rounded-xl shadow hover:shadow-xl transition cursor-pointer ${cardBg}`}
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-20 px-6 text-center ${sectionBg}`}>
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
              className={`p-8 rounded-xl shadow ${cardBg}`}
            >
              <p className="mb-4 italic">"{t.text}"</p>
              <p className="font-semibold">{t.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Homepage;
