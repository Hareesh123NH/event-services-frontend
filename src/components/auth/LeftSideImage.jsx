import { motion } from "framer-motion";

const LeftSideImage = ({ url }) => {
  return (
    <>
      {/* Left Side - Image */}
      <div className="w-full md:w relative h-screen md:h-auto">
        {/* Full-width, full-height blurred background */}
        <img
          src={url}
          alt="Event Services"
          className="w-full h-ful object-cover blur-sm"
        />

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-4 md:p-6">
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg text-center"
          >
            EventEase Rentals
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-sm sm:text-base md:text-lg text-center max-w-xs sm:max-w-md drop-shadow-md"
          >
            Simplify your event planning — rent, organize, and manage all in one
            place.
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default LeftSideImage;
