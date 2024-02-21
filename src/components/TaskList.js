// src/components/TaskList.js
import React, { useContext } from 'react';
import { useObserver } from 'mobx-react';
import { TaskStoreContext } from '../App';

const TaskList = () => {
    const taskStore = useContext(TaskStoreContext);

    return useObserver(() => (
        <div>
            {taskStore.tasks.length > 0 && (
                <div>
                    <h2>Lista de tareas</h2>
                    <ul>
                        {taskStore.tasks.map(task => (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => taskStore.toggleTaskCompletion(task.id)}
                                />
                                <span
                                    style={{
                                        textDecoration: task.completed ? 'line-through' : 'none'
                                    }}
                                >
                                    {task.task}
                                </span>
                                <button onClick={() => taskStore.deleteTask(task.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {taskStore.completedTasks.length > 0 && (
                <div>
                    <h2>Tareas completadas</h2>
                    <ul>
                        {taskStore.completedTasks.map(task => (
                            <li key={task.id}>
                                {task.task}
                                <button onClick={() => taskStore.deleteCompletedTask(task.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {taskStore.deletedTasks.length > 0 && (
                <div>
                    <h2>Tareas borradas</h2>
                    <ul>
                        {taskStore.deletedTasks.map(task => (
                            <li key={task.id}>
                                {task.task}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {taskStore.completedDeletedTasks.length > 0 && (
                <div>
                    <h2>Tareas borradas completadas</h2>
                    <ul>
                        {taskStore.completedDeletedTasks.map(task => (
                            <li key={task.id}>
                                {task.task}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    ));
};

export default TaskList;
