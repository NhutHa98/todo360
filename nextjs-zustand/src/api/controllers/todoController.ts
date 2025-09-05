import { axiosClient } from '../config/axios';
import { TODO_ENDPOINTS } from '../endpoints/todoEndpoints';
import { 
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoSearchRequest,
  BulkCreateTodoRequest,
  BulkDeleteTodoRequest,
  TodoResponse,
  TodoListResponse,
  TodoByIdParams,
  TodoListParams,
  TodoStatusParams,
  TodoUpdateParams,
  TodoDeleteParams,
  ApiResponse,
  Todo
} from '../types';

export class TodoController {
  // GET /todos - List todos with optional filters
  async getTodos(params?: TodoListParams): Promise<TodoListResponse> {
    const endpoint = TODO_ENDPOINTS['GET /todos'];
    const url = endpoint.buildUrl?.(params) || endpoint.url as string;
    return axiosClient.get<TodoListResponse>(url);
  }

  // GET /todos/:id - Get single todo
  async getTodoById(params: TodoByIdParams): Promise<TodoResponse> {
    const endpoint = TODO_ENDPOINTS['GET /todos/:id'];
    const url = endpoint.buildUrl?.(params) || 
      (typeof endpoint.url === 'function' ? endpoint.url(params) : endpoint.url);
    return axiosClient.get<TodoResponse>(url);
  }

  // POST /todos - Create todo
  async createTodo(data: CreateTodoRequest): Promise<TodoResponse> {
    const endpoint = TODO_ENDPOINTS['POST /todos'];
    return axiosClient.post<TodoResponse>(endpoint.url as string, data);
  }

  // PUT /todos/:id - Update todo
  async updateTodo(params: TodoUpdateParams, data: UpdateTodoRequest): Promise<TodoResponse> {
    const endpoint = TODO_ENDPOINTS['PUT /todos/:id'];
    const url = endpoint.buildUrl?.(params) ||
      (typeof endpoint.url === 'function' ? endpoint.url(params) : endpoint.url);
    return axiosClient.put<TodoResponse>(url, data);
  }

  // DELETE /todos/:id - Delete todo
  async deleteTodo(params: TodoDeleteParams): Promise<ApiResponse<void>> {
    const endpoint = TODO_ENDPOINTS['DELETE /todos/:id'];
    const url = endpoint.buildUrl?.(params) ||
      (typeof endpoint.url === 'function' ? endpoint.url(params) : endpoint.url);
    return axiosClient.delete<ApiResponse<void>>(url);
  }

  // POST /todos/search - Search todos
  async searchTodos(data: TodoSearchRequest): Promise<TodoListResponse> {
    const endpoint = TODO_ENDPOINTS['POST /todos/search'];
    return axiosClient.post<TodoListResponse>(endpoint.url as string, data);
  }

  // GET /todos/status/:status - Get todos by status
  async getTodosByStatus(params: TodoStatusParams): Promise<TodoListResponse> {
    const endpoint = TODO_ENDPOINTS['GET /todos/status/:status'];
    const url = endpoint.buildUrl?.(params) ||
      (typeof endpoint.url === 'function' ? endpoint.url(params) : endpoint.url);
    return axiosClient.get<TodoListResponse>(url);
  }

  // PATCH /todos/:id/toggle - Toggle todo completion
  async toggleTodo(params: TodoByIdParams): Promise<TodoResponse> {
    const endpoint = TODO_ENDPOINTS['PATCH /todos/:id/toggle'];
    const url = endpoint.buildUrl?.(params) ||
      (typeof endpoint.url === 'function' ? endpoint.url(params) : endpoint.url);
    return axiosClient.patch<TodoResponse>(url);
  }

  // POST /todos/bulk - Bulk create todos
  async bulkCreateTodos(data: BulkCreateTodoRequest): Promise<ApiResponse<Todo[]>> {
    const endpoint = TODO_ENDPOINTS['POST /todos/bulk'];
    return axiosClient.post<ApiResponse<Todo[]>>(endpoint.url as string, data);
  }

  // DELETE /todos/bulk - Bulk delete todos
  async bulkDeleteTodos(data: BulkDeleteTodoRequest): Promise<ApiResponse<void>> {
    const endpoint = TODO_ENDPOINTS['DELETE /todos/bulk'];
    return axiosClient.delete<ApiResponse<void>>(endpoint.url as string, { data });
  }
}

export const todoController = new TodoController();