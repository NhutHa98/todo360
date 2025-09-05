import { Todo } from '../../entities/todo';

export interface TodoListResponse {
  data: Todo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message: string;
  status: 'success' | 'error';
  timestamp: string;
}