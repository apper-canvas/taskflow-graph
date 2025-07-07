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

  const handleAddTask = async (taskText) => {
    try {
      const newTask = await taskService.create({ text: taskText });
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

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header 
          taskCount={tasks.length} 
          completedCount={completedCount}
        />
        
        <TaskInput 
          onAddTask={handleAddTask}
          disabled={loading}
        />
        
        <div className="mt-6">
          <TaskList
            tasks={tasks}
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