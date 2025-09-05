import React, { useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodoListParams, Todo } from '../../../api/types';
import { useTodos } from '../../../hooks/useTodos';

interface TodoListProps {
  filters?: TodoListParams;
  onEditTodo?: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ filters, onEditTodo }) => {
  const { data: response, isLoading, error } = useTodos(filters);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading todos. Please try again.</p>
      </div>
    );
  }

  if (!response?.data?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No todos found. Create your first todo!</p>
      </div>
    );
  }

  const { data: todos, pagination } = response;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Todos ({pagination?.total || 0})
        </h2>
        {pagination && (
          <div className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.pages}
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEditTodo}
          />
        ))}
      </div>
      
      {pagination && pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            disabled={!pagination.hasPrev}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            {pagination.page} / {pagination.pages}
          </span>
          <button
            disabled={!pagination.hasNext}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};