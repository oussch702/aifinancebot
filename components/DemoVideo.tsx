import React from 'react';
import { Play, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DemoVideoProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DemoVideo({ isOpen, onClose }: DemoVideoProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-white/75 hover:text-white bg-black/50 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="aspect-w-16 aspect-h-9">
              <video
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1920&q=80"
                controls={isPlaying}
                onClick={() => setIsPlaying(true)}
              >
                <source
                  src="https://storage.googleapis.com/webcontainer-assets/demo.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="flex items-center space-x-3 px-6 py-3 bg-white rounded-lg text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Play className="h-5 w-5" />
                    <span>Watch Demo</span>
                  </motion.button>
                </div>
              )}

              <button
                onClick={() => document.documentElement.requestFullscreen()}
                className="absolute bottom-4 right-4 p-2 text-white hover:text-gray-200 transition-colors"
                aria-label="Full screen"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <motion.div
                className="h-full bg-indigo-600"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "100%" : "0%" }}
                transition={{ duration: 180, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}