import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskCard = ({ task, onToggleComplete, onDeleteTask }) => {
  const handleToggle = () => {
    onToggleComplete(task.Id);
  };

  const handleDelete = () => {
    onDeleteTask(task.Id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "bg-white p-4 rounded-lg shadow-card transition-all duration-300 hover:shadow-elevation group",
        task.completed && "bg-gray-50 border border-gray-200"
      )}
    >
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggle}
          className="flex-shrink-0"
        />
        
<div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <p className={cn(
              "text-base transition-all duration-200",
              task.completed 
                ? "task-text-completed" 
                : "text-gray-900"
            )}>
              {task.text}
            </p>
            <div className={cn(
              "w-2 h-2 rounded-full flex-shrink-0",
              task.priority === 'High' && "bg-red-500",
              task.priority === 'Medium' && "bg-yellow-500",
              task.priority === 'Low' && "bg-green-500"
            )} />
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              task.category === 'Work' && "bg-blue-100 text-blue-800",
              task.category === 'Personal' && "bg-purple-100 text-purple-800",
              task.category === 'Shopping' && "bg-green-100 text-green-800",
              task.category === 'Health' && "bg-red-100 text-red-800"
            )}>
              {task.category}
            </span>
            <p className="text-xs text-gray-500">
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="p-1.5 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 rounded-md"
            title="Delete task"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;