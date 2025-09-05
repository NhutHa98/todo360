export interface TodoListParams {
  status?: 'completed' | 'pending';
  priority?: 'low' | 'medium' | 'high';
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
  userId?: string;
}