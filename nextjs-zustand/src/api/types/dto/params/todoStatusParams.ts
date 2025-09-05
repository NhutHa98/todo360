export interface TodoStatusParams {
  status: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
}