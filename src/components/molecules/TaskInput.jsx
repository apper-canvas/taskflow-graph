import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskInput = ({ onAddTask, disabled = false }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');

  const priorities = ['High', 'Medium', 'Low'];
  const categories = ['Work', 'Personal', 'Shopping', 'Health'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() && !disabled) {
      onAddTask({
        text: taskText.trim(),
        priority,
        category
      });
      setTaskText('');
      setPriority('Medium');
      setCategory('Personal');
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
<form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-3">
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
          
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={disabled}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {priorities.map(p => (
              <option key={p} value={p}>{p} Priority</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 self-center">Category:</span>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              disabled={disabled}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                category === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end">
        
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
        </div>
      </form>
    </motion.div>
  );
};

export default TaskInput;