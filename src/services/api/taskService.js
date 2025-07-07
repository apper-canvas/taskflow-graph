import { v4 as uuidv4 } from 'uuid';

class TaskService {
  constructor() {
    this.storageKey = 'taskflow-tasks';
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
const defaultTasks = [
        {
          Id: 1,
          text: "Complete project presentation",
          completed: false,
          priority: "High",
          category: "Work",
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Tomorrow
        },
        {
          Id: 2,
          text: "Review team feedback",
          completed: false,
          priority: "Medium",
          category: "Work",
          createdAt: new Date().toISOString(),
          dueDate: new Date().toISOString().split('T')[0] // Today
        },
        {
          Id: 3,
          text: "Update project documentation",
          completed: true,
          priority: "Low",
          category: "Work",
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Yesterday (overdue)
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultTasks));
    }
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        resolve([...tasks]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        const task = tasks.find(t => t.Id === id);
        resolve(task ? { ...task } : null);
      }, 200);
    });
  }

  async create(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        const newId = Math.max(...tasks.map(t => t.Id), 0) + 1;
        
const newTask = {
          Id: newId,
          text: taskData.text,
          completed: false,
          priority: taskData.priority || "Medium",
          category: taskData.category || "Personal",
          createdAt: new Date().toISOString(),
          dueDate: taskData.dueDate || null
        };
        
        tasks.push(newTask);
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        resolve({ ...newTask });
      }, 200);
    });
  }

  async update(id, updates) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        const taskIndex = tasks.findIndex(t => t.Id === id);
        
        if (taskIndex !== -1) {
          tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
          localStorage.setItem(this.storageKey, JSON.stringify(tasks));
          resolve({ ...tasks[taskIndex] });
        } else {
          resolve(null);
        }
      }, 200);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        const filteredTasks = tasks.filter(t => t.Id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filteredTasks));
        resolve(true);
      }, 200);
    });
  }

  async toggleComplete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        const taskIndex = tasks.findIndex(t => t.Id === id);
        
        if (taskIndex !== -1) {
          tasks[taskIndex].completed = !tasks[taskIndex].completed;
          localStorage.setItem(this.storageKey, JSON.stringify(tasks));
          resolve({ ...tasks[taskIndex] });
        } else {
          resolve(null);
        }
      }, 200);
});
  }

  async clearCompleted() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        const activeTasks = tasks.filter(t => !t.completed);
        localStorage.setItem(this.storageKey, JSON.stringify(activeTasks));
        resolve(true);
      }, 200);
    });
  }

  async reorderTasks(reorderedTasks) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update the storage with the new order
        localStorage.setItem(this.storageKey, JSON.stringify(reorderedTasks));
        resolve([...reorderedTasks]);
      }, 200);
    });
  }
}

export default new TaskService();