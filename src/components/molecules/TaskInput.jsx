import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskInput = ({ onAddTask, disabled = false }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() && !disabled) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-card"
    >
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="text-base"
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!taskText.trim() || disabled}
          className="px-6 flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>Add Task</span>
        </Button>
      </form>
    </motion.div>
  );
};

export default TaskInput;