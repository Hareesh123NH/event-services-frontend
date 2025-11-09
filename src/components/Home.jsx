import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {bgImages,categories,testimonials} from "./data/duplicatedata";


const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const Homepage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [playVideo, setPlayVideo] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const { effectiveType, saveData } = connection;
      if (saveData || effectiveType === "2g" || effectiveType === "slow-2g") setPlayVideo(false);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#0f0620] via-[#1b0740] to-[#3b0f5a] text-white relative overflow-hidden">

      {/* HERO SECTION */}
      <motion.header
        id="hero"
        className="relative flex flex-col items-center justify-center text-center py-16 sm:py-24 px-4 sm:px-6 min-h-[90vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {bgImages.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt="event"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentImage ? "opacity-60" : "opacity-0"
              }`}
            animate={{ scale: i === currentImage ? 1.1 : 1 }}
            transition={{ duration: 6, ease: "easeInOut" }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0620]/70 via-[#1b0740]/70 to-[#3b0f5a]/80"></div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 p-6 sm:p-10 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Celebrate Life with the Best{" "}
            <span className="text-pink-400">Event Services</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-6">
            Discover trusted vendors for weddings, parties, and festivals — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard/home"
                className="inline-block px-8 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition w-full sm:w-auto text-center"
              >
                Find Vendors
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/vendor-register"
                className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition w-full sm:w-auto text-center"
              >
                Register as Vendor
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.header>

      {/* SERVICES SECTION */}
      <section id="services" className="py-14 sm:py-16 px-4 sm:px-6 bg-black/20">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12"
        >
          Explore Event Services
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((c, index) => {
            const youtubeId = extractYouTubeId(c.video);
            const [hovered, setHovered] = React.useState(false);

            return (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="relative w-full h-52 sm:h-56 overflow-hidden">
                  {hovered ? (
                    youtubeId ? (
                      <iframe
                        className="w-full h-full object-cover"
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}`}
                        title={c.title}
                        allow="autoplay; fullscreen"
                      ></iframe>
                    ) : (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={c.video} type="video/mp4" />
                      </video>
                    )
                  ) : (
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Title below the image/video */}
                <div className="bg-black/30 text-center py-2">
                  <p className="text-base sm:text-lg font-semibold">{c.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-14 sm:py-16 px-4 sm:px-6">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12"
        >
          What Our Users Say
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-5 sm:p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-lg"
            >
              <p className="italic mb-3 text-base sm:text-lg">"{t.text}"</p>
              <p className="font-semibold text-purple-300 text-sm sm:text-base">{t.author}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
