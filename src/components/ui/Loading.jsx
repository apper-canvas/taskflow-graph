import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="bg-white p-6 rounded-lg shadow-card">
        <div className="flex items-center space-x-4">
          <div className="h-10 bg-gray-200 rounded-md animate-pulse flex-1"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Task list skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow-card"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;