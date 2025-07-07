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
        "bg-white p-4 rounded-lg shadow-card transition-all duration-200 hover:shadow-elevation group",
        task.completed && "task-completed"
      )}
    >
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggle}
          className="flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <p className={cn(
            "text-base transition-all duration-200",
            task.completed 
              ? "task-text-completed" 
              : "text-gray-900"
          )}>
            {task.text}
          </p>
          
          <p className="text-xs text-gray-500 mt-1">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="p-1 hover:bg-red-50 hover:text-red-600"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;