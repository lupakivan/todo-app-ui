import React, { useEffect } from 'react';
import './app.css';

import { useAppSelector, useAppDispatch } from './hooks';
import { TasksList } from './TodoList';
import {
    fetchAllTasks,
    selectTodo,
    createTask,
    deleteAllTasks,
} from './todoSlice';

export function App() {
  const todos = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();
  const [title, setTitle] = React.useState('');
  const [search, setSearch] = React.useState('');

  const handleTodoCreate = () => {
      dispatch(createTask(title));
      setTitle('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTodoCreate();
        }
  }

  useEffect(() => {
      dispatch(fetchAllTasks(search));
  }, [search, dispatch]);

  return (
    <div className="container">
        <div className="header">
            <div className="header-top">
                <a
                    href="#"
                    onClick={() => dispatch(deleteAllTasks())}
                    className="delete-all-btn"
                >
                    Delete all tasks
                </a>
            </div>
            <div className="header-bottom">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="text-field"
                    />
                    <button onClick={handleTodoCreate} className="add-task-button">Add</button>
                </div>
                <div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-field"
                        placeholder="Search..."
                    />
                </div>
            </div>
        </div>
        <div className="task-lists-wrapper">
            <TasksList title="To Do" items={todos.active} />
            <TasksList title="Done" items={todos.done} />
        </div>
    </div>
  );
}
