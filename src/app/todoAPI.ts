import axios from 'axios';
import { Task } from './types';

export async function getAllTasks(search?: string): Promise<Task[]> {
  let url = 'http://localhost:3001/todo';

  if(search) {
    url += `?search=${search}`;
  }

  const response = await axios.get(url);

  return response.data as Task[];
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const response = await axios.patch(`http://localhost:3001/todo/${id}`, data);

  return response.data as Task;
}

export async function createTask(title: string): Promise<Task> {
  const response = await axios.post(`http://localhost:3001/todo`, { title });

  return response.data as Task;
}

export async function deleteAllTasks(): Promise<void> {
  return axios.delete(`http://localhost:3001/todo`);
}
