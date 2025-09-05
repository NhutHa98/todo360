import React from 'react';
import { Todo } from '../../../api/types';
import { Button } from '../../ui/Button';
import { formatDate, getPriorityColor, getStatusColor, truncateText } from '../../../utils/helpers';
import { useToggleTodo, useDeleteTodo } from '../../../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onEdit?: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggle = () => {
    toggleTodo.mutate({ id: todo.id });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo.mutate({ id: todo.id });
    }
  };

  const handleEdit = () => {
    onEdit?.(todo);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
          </div>
          
          {todo.description && (
            <p className="text-sm text-gray-600 mb-2 ml-7">
              {truncateText(todo.description, 100)}
            </p>
          )}
          
          <div className="flex items-center gap-2 ml-7">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
              {todo.priority}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(todo.completed)}`}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
            {todo.dueDate && (
              <span className="text-xs text-gray-500">
                Due: {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-700"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700"
            disabled={deleteTodo.isPending}
          >
            {deleteTodo.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};