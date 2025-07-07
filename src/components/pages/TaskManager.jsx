import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import TaskList from "@/components/organisms/TaskList";
import Header from "@/components/organisms/Header";
import TaskInput from "@/components/molecules/TaskInput";
import taskService from "@/services/api/taskService";

const TaskManager = () => {
const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Date Added');
  const [sortDirection, setSortDirection] = useState('desc');
  const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health'];
  
// Filter by category
  const categoryFilteredTasks = selectedCategory === 'All' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);
  
  // Sort tasks
  const sortTasks = (tasks, sortBy, direction) => {
    const sorted = [...tasks].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'Due Date':
          aValue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          bValue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          break;
        case 'Priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        case 'Date Added':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'Alphabetical':
          aValue = a.text.toLowerCase();
          bValue = b.text.toLowerCase();
          return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        default:
          return 0;
      }
      
      if (direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
    
    return sorted;
  };
  
  const filteredTasks = sortTasks(categoryFilteredTasks, sortBy, sortDirection);
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
    initial={{
        opacity: 0
    }}
    animate={{
        opacity: 1
    }}
    className="min-h-screen bg-gray-100">
    <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header taskCount={filteredTasks.length} completedCount={completedCount} />
        <TaskInput onAddTask={handleAddTask} disabled={loading} />
        {/* Category Filter Bar */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow-card">
            <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 self-center mr-2">Filter by:</span>
                {categories.map(category => <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category ? "bg-primary text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    {category}
                    {category !== "All" && <span className="ml-1 text-xs opacity-75">({tasks.filter(task => task.category === category).length})
                                          </span>}
                    {category === "All" && <span className="ml-1 text-xs opacity-75">({tasks.length})
                                          </span>}
                </button>)}
            </div>
        </div>
    </div>
    {/* Sort Controls */}
    <div className="mt-4 bg-white p-4 rounded-lg shadow-card">
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="Due Date">Due Date</option>
                <option value="Priority">Priority</option>
                <option value="Date Added">Date Added</option>
                <option value="Alphabetical">Alphabetical</option>
            </select>
            <button
                onClick={() => setSortDirection(prev => prev === "asc" ? "desc" : "asc")}
                className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                title={`Sort ${sortDirection === "asc" ? "Descending" : "Ascending"}`}>
                <ApperIcon
                    name={sortDirection === "asc" ? "ArrowUp" : "ArrowDown"}
                    className="w-4 h-4" />
                <span>{sortDirection === "asc" ? "Ascending" : "Descending"}</span>
            </button>
            <div className="text-xs text-gray-500 ml-2">
                {filteredTasks.length}task{filteredTasks.length !== 1 ? "s" : ""}
            </div>
        </div>
    </div>
    <TaskList
        tasks={filteredTasks}
        loading={loading}
        error={error}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
        onRetry={loadTasks} />
</motion.div>
  );
};

export default TaskManager;