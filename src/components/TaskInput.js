// src/components/TaskInput.js
import React, { useState, useContext } from 'react';
import { TaskStoreContext } from '../App';

const TaskInput = () => {
    const [task, setTask] = useState('');
    const taskStore = useContext(TaskStoreContext);

    const handleChange = event => {
        setTask(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (task.trim()) {
            taskStore.addTask(task);
            setTask('');
        }
    };

    return (
        <div className="form-container">
            <input
                type="text"
                placeholder="Enter task"
                value={task}
                onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>Añadir tarea</button>
        </div>
    );
};

export default TaskInput;