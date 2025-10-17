import React from "react";
import { motion } from "framer-motion";

const VideoGrid = ({ videos, search }) => {
  return (
    <motion.div
      layout
      className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto"
    >
      {videos
        .filter((v) => v.title.toLowerCase().includes(search.toLowerCase()))
        .map((video) => (
          <motion.div
            key={video.id}
            layout
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="rounded-t-xl"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{video.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                1M views • 2 days ago
              </p>
            </div>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default VideoGrid;
