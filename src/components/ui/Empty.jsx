import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started",
  icon = "CheckCircle"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-12 rounded-lg shadow-card text-center"
    >
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-10 h-10 text-blue-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <ApperIcon name="ArrowUp" className="w-4 h-4" />
        <span>Use the input field above to add your first task</span>
      </div>
    </motion.div>
  );
};

export default Empty;