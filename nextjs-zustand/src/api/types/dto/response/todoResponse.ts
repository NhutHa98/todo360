import { Todo } from '../../entities/todo';

export interface TodoResponse {
  data: Todo;
  message: string;
  status: 'success' | 'error';
  timestamp: string;
}