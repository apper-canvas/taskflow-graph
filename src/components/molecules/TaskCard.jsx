import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onDeleteTask, 
  dragHandleProps, 
  isDragging = false,
  showDragHandle = true 
}) => {
  // Date utility functions
  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Reset time for accurate comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === today.getTime()) return 'Today';
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
    if (date.getTime() < today.getTime()) return 'Overdue';
    if (date.getTime() <= today.getTime() + (7 * 24 * 60 * 60 * 1000)) return 'This week';
    return date.toLocaleDateString();
  };
  
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    const today = new Date();
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return date.getTime() < today.getTime();
  };
  
  const getDueDateBadge = (dueDate) => {
    if (!dueDate) return null;
    const formatted = formatDueDate(dueDate);
    if (formatted === 'Today') return { text: 'Today', class: 'bg-yellow-100 text-yellow-800' };
    if (formatted === 'Tomorrow') return { text: 'Tomorrow', class: 'bg-blue-100 text-blue-800' };
    if (formatted === 'Overdue') return { text: 'Overdue', class: 'bg-red-100 text-red-800' };
    if (formatted === 'This week') return { text: 'Upcoming', class: 'bg-purple-100 text-purple-800' };
    return null;
  };
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
      whileHover={{ scale: showDragHandle && !isDragging ? 1.01 : 1 }}
      className={cn(
        "bg-white dark:bg-gray-800 p-4 rounded-lg shadow-card transition-all duration-300 hover:shadow-elevation group relative",
        task.completed && "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600",
        !task.completed && isOverdue(task.dueDate) && "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800",
        isDragging && "transform rotate-2 shadow-2xl scale-105 z-50",
        isDragging && "ring-2 ring-primary ring-opacity-50"
      )}
    >
<div className="flex items-center space-x-3">
        {/* Drag Handle */}
        {showDragHandle && !task.completed && (
          <div
            {...dragHandleProps}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Drag to reorder"
          >
            <ApperIcon name="GripVertical" className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        
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
                : "text-gray-900 dark:text-white"
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
              task.category === 'Work' && "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
              task.category === 'Personal' && "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
              task.category === 'Shopping' && "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              task.category === 'Health' && "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
            )}>
              {task.category}
            </span>
            {getDueDateBadge(task.dueDate) && (
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                getDueDateBadge(task.dueDate).class
              )}>
                {getDueDateBadge(task.dueDate).text}
              </span>
            )}
<p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          {/* Due Date Display */}
          {task.dueDate && (
<div className="mt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Due: {formatDueDate(task.dueDate) === 'Today' || formatDueDate(task.dueDate) === 'Tomorrow' || formatDueDate(task.dueDate) === 'Overdue' || formatDueDate(task.dueDate) === 'This week'
                  ? formatDueDate(task.dueDate)
                  : new Date(task.dueDate).toLocaleDateString()
                }
              </p>
            </div>
          )}
        </div>
        
<div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 rounded-md"
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