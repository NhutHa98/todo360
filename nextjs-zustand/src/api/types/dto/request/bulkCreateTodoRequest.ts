export interface BulkCreateTodoRequest {
  todos: Array<{
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: Date;
  }>;
}