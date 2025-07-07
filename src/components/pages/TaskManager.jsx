import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import TaskInput from '@/components/molecules/TaskInput';
import TaskList from '@/components/organisms/TaskList';
import taskService from '@/services/api/taskService';

const TaskManager = () => {
const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health'];
  
  const filteredTasks = selectedCategory === 'All' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      if (updatedTask) {
        setTasks(prev => 
          prev.map(task => 
            task.Id === taskId ? updatedTask : task
          )
        );
        
        if (updatedTask.completed) {
          toast.success("Task completed! 🎉");
        } else {
          toast.info("Task marked as incomplete");
        }
      }
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

const completedCount = filteredTasks.filter(task => task.completed).length;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100"
    >
<div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header 
          taskCount={filteredTasks.length} 
          completedCount={completedCount}
        />
        
        <TaskInput 
          onAddTask={handleAddTask}
          disabled={loading}
        />
        
        {/* Category Filter Bar */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-card">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 self-center mr-2">Filter by:</span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({tasks.filter(task => task.category === category).length})
                  </span>
                )}
                {category === 'All' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({tasks.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
<TaskList
            tasks={filteredTasks}
            loading={loading}
            error={error}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onRetry={loadTasks}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TaskManager;