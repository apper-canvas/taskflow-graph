import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ taskCount = 0, completedCount = 0 }) => {
  const completionPercentage = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-card rounded-lg p-6 mb-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task<span className="text-primary">Flow</span>
          </h1>
          <p className="text-gray-600">
            Stay organized and productive with your daily tasks
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {taskCount}
            </div>
            <div className="text-sm text-gray-600">
              Total Tasks
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {completedCount}
            </div>
            <div className="text-sm text-gray-600">
              Completed
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {completionPercentage}%
            </div>
            <div className="text-sm text-gray-600">
              Progress
            </div>
          </div>
        </div>
      </div>
      
      {taskCount > 0 && (
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <ApperIcon name="TrendingUp" className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">
              Daily Progress
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary to-success h-2 rounded-full"
            />
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;