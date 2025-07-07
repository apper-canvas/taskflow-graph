import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggleComplete, 
  onDeleteTask, 
  onRetry 
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!tasks || tasks.length === 0) {
    return <Empty />;
  }

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <div className="space-y-4">
      {/* Active Tasks */}
      {incompleteTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <span>Active Tasks</span>
            <span className="bg-primary text-white text-xs px-2.5 py-1 rounded-full font-medium">
              {incompleteTasks.length} remaining
            </span>
          </h3>
          <AnimatePresence>
            {incompleteTasks.map(task => (
              <TaskCard
                key={task.Id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <span>Completed</span>
            <span className="bg-success text-white text-xs px-2 py-1 rounded-full">
              {completedTasks.length}
            </span>
          </h3>
          
          <AnimatePresence>
            {completedTasks.map(task => (
              <TaskCard
                key={task.Id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;