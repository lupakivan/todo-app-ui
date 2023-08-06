import axios from 'axios';
import { Task } from './types';

export async function getAllTasks(search?: string): Promise<Task[]> {
  let url: string = `${process.env.REACT_APP_API_URL}/todo` || '';

  if(search) {
    url += `?search=${search}`;
  }

  const response = await axios.get(url);

  return response.data as Task[];
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const response = await axios.patch(`${process.env.REACT_APP_API_URL}/todo/${id}`, data);

  return response.data as Task;
}

export async function createTask(title: string): Promise<Task> {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/todo`, { title });

  return response.data as Task;
}

export async function deleteAllTasks(): Promise<void> {
  return axios.delete(`${process.env.REACT_APP_API_URL}/todo`);
}
