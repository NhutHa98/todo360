export interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
  timestamp: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
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

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}