// src/App.js
import React from 'react';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import TaskStore from './store/TaskStore';
import './styles.css';
export const TaskStoreContext = React.createContext();

function App() {
    return (
        <TaskStoreContext.Provider value={TaskStore}>
            <div className="container">
                <h1>Gestor de tareas</h1>
                <TaskInput />
                <TaskList />
            </div>
        </TaskStoreContext.Provider>
    );
}

export default App;