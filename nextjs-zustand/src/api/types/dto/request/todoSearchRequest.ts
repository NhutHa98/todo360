export interface TodoSearchRequest {
  query: string;
  filters?: {
    status?: 'completed' | 'pending';
    priority?: 'low' | 'medium' | 'high';
    userId?: string;
  };
}