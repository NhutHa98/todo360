import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoController } from '../api/controllers/todoController';
import { TODO_QUERY_KEYS } from '../api/endpoints/todoEndpoints';
import { 
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoSearchRequest,
  BulkCreateTodoRequest,
  BulkDeleteTodoRequest,
  TodoByIdParams,
  TodoListParams,
  TodoStatusParams,
  TodoUpdateParams,
  TodoDeleteParams
} from '../api/types';

// Query hooks
export const useTodos = (params?: TodoListParams) => {
  return useQuery({
    queryKey: TODO_QUERY_KEYS.LIST(params),
    queryFn: () => todoController.getTodos(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTodo = (params: TodoByIdParams) => {
  return useQuery({
    queryKey: TODO_QUERY_KEYS.DETAIL(params),
    queryFn: () => todoController.getTodoById(params),
    enabled: !!params.id,
  });
};

export const useTodosByStatus = (params: TodoStatusParams) => {
  return useQuery({
    queryKey: TODO_QUERY_KEYS.BY_STATUS(params),
    queryFn: () => todoController.getTodosByStatus(params),
    enabled: !!params.status,
  });
};

export const useSearchTodos = (params: TodoSearchRequest) => {
  return useQuery({
    queryKey: TODO_QUERY_KEYS.SEARCH(params),
    queryFn: () => todoController.searchTodos(params),
    enabled: !!params.query,
  });
};

// Mutation hooks
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTodoRequest) => todoController.createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.ALL });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ params, data }: { params: TodoUpdateParams; data: UpdateTodoRequest }) => 
      todoController.updateTodo(params, data),
    onSuccess: (_, { params }) => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.ALL });
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.DETAIL(params) });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: TodoDeleteParams) => todoController.deleteTodo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.ALL });
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: TodoByIdParams) => todoController.toggleTodo(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.ALL });
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.DETAIL(params) });
    },
  });
};

export const useBulkCreateTodos = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: BulkCreateTodoRequest) => todoController.bulkCreateTodos(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.ALL });
    },
  });
};

export const useBulkDeleteTodos = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: BulkDeleteTodoRequest) => todoController.bulkDeleteTodos(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.ALL });
    },
  });
};