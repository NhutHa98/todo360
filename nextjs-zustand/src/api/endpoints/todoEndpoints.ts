import { ApiEndpointDefinition, createQueryKey, buildQueryParams } from '../base/apiDefinition';
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

export const TODO_ENDPOINTS = {
  // GET /todos - List todos with optional filters
  'GET /todos': {
    url: '/todos',
    method: 'GET' as const,
    queryKey: (params?: TodoListParams) => createQueryKey('/todos/list', params),
    requestType: {} as TodoListParams,
    responseType: {} as TodoListResponse,
    buildUrl: (params?: TodoListParams) => `/todos${buildQueryParams(params || {})}`,
  } satisfies ApiEndpointDefinition<TodoListParams, TodoListResponse, TodoListParams>,

  // GET /todos/:id - Get single todo
  'GET /todos/:id': {
    url: (params: TodoByIdParams) => `/todos/${params.id}`,
    method: 'GET' as const,
    queryKey: (params: TodoByIdParams) => createQueryKey(`/todos/${params.id}`),
    requestType: {} as TodoByIdParams,
    responseType: {} as TodoResponse,
    buildUrl: (params: TodoByIdParams) => `/todos/${params.id}`,
  } satisfies ApiEndpointDefinition<TodoByIdParams, TodoResponse, TodoByIdParams>,

  // POST /todos - Create todo
  'POST /todos': {
    url: '/todos',
    method: 'POST' as const,
    queryKey: () => createQueryKey('/todos/create'),
    requestType: {} as CreateTodoRequest,
    responseType: {} as TodoResponse,
  } satisfies ApiEndpointDefinition<CreateTodoRequest, TodoResponse>,

  // PUT /todos/:id - Update todo
  'PUT /todos/:id': {
    url: (params: TodoUpdateParams) => `/todos/${params.id}`,
    method: 'PUT' as const,
    queryKey: (params: TodoUpdateParams) => createQueryKey(`/todos/${params.id}/update`),
    requestType: {} as { id: string; data: UpdateTodoRequest },
    responseType: {} as TodoResponse,
    buildUrl: (params: TodoUpdateParams) => `/todos/${params.id}`,
  } satisfies ApiEndpointDefinition<{ id: string; data: UpdateTodoRequest }, TodoResponse, TodoUpdateParams>,

  // DELETE /todos/:id - Delete todo
  'DELETE /todos/:id': {
    url: (params: TodoDeleteParams) => `/todos/${params.id}`,
    method: 'DELETE' as const,
    queryKey: (params: TodoDeleteParams) => createQueryKey(`/todos/${params.id}/delete`),
    requestType: {} as TodoDeleteParams,
    responseType: {} as ApiResponse<void>,
    buildUrl: (params: TodoDeleteParams) => `/todos/${params.id}`,
  } satisfies ApiEndpointDefinition<TodoDeleteParams, ApiResponse<void>, TodoDeleteParams>,

  // POST /todos/search - Search todos
  'POST /todos/search': {
    url: '/todos/search',
    method: 'POST' as const,
    queryKey: (params: TodoSearchRequest) => 
      createQueryKey('/todos/search', { query: params.query, ...params.filters }),
    requestType: {} as TodoSearchRequest,
    responseType: {} as TodoListResponse,
  } satisfies ApiEndpointDefinition<TodoSearchRequest, TodoListResponse, TodoSearchRequest>,

  // GET /todos/status/:status - Get todos by status
  'GET /todos/status/:status': {
    url: (params: TodoStatusParams) => `/todos/status/${params.status}`,
    method: 'GET' as const,
    queryKey: (params: TodoStatusParams) => 
      createQueryKey(`/todos/status/${params.status}`, params),
    requestType: {} as TodoStatusParams,
    responseType: {} as TodoListResponse,
    buildUrl: (params: TodoStatusParams) => {
      const { status, ...filters } = params;
      return `/todos/status/${status}${buildQueryParams(filters)}`;
    },
  } satisfies ApiEndpointDefinition<TodoStatusParams, TodoListResponse, TodoStatusParams>,

  // PATCH /todos/:id/toggle - Toggle todo completion
  'PATCH /todos/:id/toggle': {
    url: (params: TodoByIdParams) => `/todos/${params.id}/toggle`,
    method: 'PATCH' as const,
    queryKey: (params: TodoByIdParams) => createQueryKey(`/todos/${params.id}/toggle`),
    requestType: {} as TodoByIdParams,
    responseType: {} as TodoResponse,
    buildUrl: (params: TodoByIdParams) => `/todos/${params.id}/toggle`,
  } satisfies ApiEndpointDefinition<TodoByIdParams, TodoResponse, TodoByIdParams>,

  // POST /todos/bulk - Bulk create todos
  'POST /todos/bulk': {
    url: '/todos/bulk',
    method: 'POST' as const,
    queryKey: () => createQueryKey('/todos/bulk/create'),
    requestType: {} as BulkCreateTodoRequest,
    responseType: {} as ApiResponse<Todo[]>,
  } satisfies ApiEndpointDefinition<BulkCreateTodoRequest, ApiResponse<Todo[]>>,

  // DELETE /todos/bulk - Bulk delete todos
  'DELETE /todos/bulk': {
    url: '/todos/bulk',
    method: 'DELETE' as const,
    queryKey: () => createQueryKey('/todos/bulk/delete'),
    requestType: {} as BulkDeleteTodoRequest,
    responseType: {} as ApiResponse<void>,
  } satisfies ApiEndpointDefinition<BulkDeleteTodoRequest, ApiResponse<void>>,
} as const;

// Export query keys for direct access
export const TODO_QUERY_KEYS = {
  ALL: ['todos'] as const,
  LIST: (params?: TodoListParams) => TODO_ENDPOINTS['GET /todos'].queryKey(params),
  DETAIL: (params: TodoByIdParams) => TODO_ENDPOINTS['GET /todos/:id'].queryKey(params),
  SEARCH: (params: TodoSearchRequest) => TODO_ENDPOINTS['POST /todos/search'].queryKey(params),
  BY_STATUS: (params: TodoStatusParams) => TODO_ENDPOINTS['GET /todos/status/:status'].queryKey(params),
} as const;

// Type helpers to extract types from endpoints
export type EndpointRequest<T> = T extends ApiEndpointDefinition<infer R, any, any> ? R : never;
export type EndpointResponse<T> = T extends ApiEndpointDefinition<any, infer R, any> ? R : never;
export type EndpointParams<T> = T extends ApiEndpointDefinition<any, any, infer P> ? P : never;