// src/store/TaskStore.js
import { makeAutoObservable } from 'mobx';

class TaskStore {
    tasks = [];
    deletedTasks = [];
    completedTasks = [];
    completedDeletedTasks = [];

    constructor() {
        makeAutoObservable(this);
        this.loadTasks();
    }

    addTask(task) {
        this.tasks.push({ id: Date.now(), task, completed: false });
        this.saveTasks();
    }

    deleteTask(id) {
        const deletedTask = this.tasks.find(task => task.id === id);
        this.deletedTasks.push(deletedTask);
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleTaskCompletion(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            const task = this.tasks[taskIndex];
            task.completed = !task.completed;
            if (task.completed) {
                this.completedTasks.push(task);
                this.tasks.splice(taskIndex, 1);
            }
        }
        this.saveTasks();
    }

    deleteCompletedTask(id) {
        const deletedTask = this.completedTasks.find(task => task.id === id);
        this.completedDeletedTasks.push(deletedTask);
        this.completedTasks = this.completedTasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }

        const storedDeletedTasks = localStorage.getItem('deletedTasks');
        if (storedDeletedTasks) {
            this.deletedTasks = JSON.parse(storedDeletedTasks);
        }

        const storedCompletedTasks = localStorage.getItem('completedTasks');
        if (storedCompletedTasks) {
            this.completedTasks = JSON.parse(storedCompletedTasks);
        }

        const storedCompletedDeletedTasks = localStorage.getItem('completedDeletedTasks');
        if (storedCompletedDeletedTasks) {
            this.completedDeletedTasks = JSON.parse(storedCompletedDeletedTasks);
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('deletedTasks', JSON.stringify(this.deletedTasks));
        localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
        localStorage.setItem('completedDeletedTasks', JSON.stringify(this.completedDeletedTasks));
    }
}

export default new TaskStore();
