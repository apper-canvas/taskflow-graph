import { AnimatePresence, motion } from "framer-motion";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import TaskCard from "@/components/molecules/TaskCard";

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggleComplete, 
  onDeleteTask, 
  onRetry,
  onReorderTasks,
  onClearCompleted
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const reorderedTasks = Array.from(tasks);
    const [reorderedItem] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, reorderedItem);

    onReorderTasks?.(reorderedTasks);
  };

const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        {/* Active Tasks */}
        {incompleteTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <span>Active Tasks</span>
              <span className="bg-primary text-white text-xs px-2.5 py-1 rounded-full font-medium">
                {incompleteTasks.length} remaining
              </span>
            </h3>
            
            <Droppable droppableId="active-tasks">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`space-y-2 transition-colors duration-200 ${
                    snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2' : ''
                  }`}
                >
                  <AnimatePresence>
                    {incompleteTasks.map((task, index) => (
                      <Draggable key={task.Id} draggableId={task.Id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              transform: snapshot.isDragging 
                                ? provided.draggableProps.style?.transform 
                                : 'translate(0px, 0px)',
                            }}
                          >
                            <TaskCard
                              task={task}
                              onToggleComplete={onToggleComplete}
                              onDeleteTask={onDeleteTask}
                              dragHandleProps={provided.dragHandleProps}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </motion.div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <span>Completed</span>
                <span className="bg-success text-white text-xs px-2 py-1 rounded-full">
                  {completedTasks.length}
                </span>
              </h3>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearCompleted}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-1" />
                Clear Completed
              </Button>
            </div>
            
            <div className="space-y-2">
              <AnimatePresence>
                {completedTasks.map(task => (
                  <motion.div
                    key={task.Id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TaskCard
                      task={task}
                      onToggleComplete={onToggleComplete}
                      onDeleteTask={onDeleteTask}
                      showDragHandle={false}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Empty State Enhancement */}
        {tasks.length === 0 && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <ApperIcon name="CheckCircle2" className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">All caught up!</h3>
            <p className="text-gray-500 dark:text-gray-400">Create a new task to get started.</p>
          </motion.div>
        )}
      </div>
    </DragDropContext>
  );
};

export default TaskList;