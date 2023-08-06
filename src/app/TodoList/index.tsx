import React from 'react';
import { useAppDispatch } from '../hooks';
import { updateTaskStatus } from '../todoSlice';
import { Task } from '../types';
import './style.css';

interface Props {
    title: string;
    items: Task[];
}

export const TasksList = ({ title, items }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <div className="task-list-wrapper">
            <h2>{title}</h2>
            <ul className="tasks-list">{items.map(todo => {
                return (
                    <div key={todo.id} className="task-wrapper">
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() => dispatch(updateTaskStatus({ id: todo.id, isDone: !todo.isDone }))}
                            className="task-checkbox"
                        />
                        <div className="task-title">{todo.title}</div>
                    </div>
                )
            })}</ul>
        </div>
    );
}
