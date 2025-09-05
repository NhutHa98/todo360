import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { CreateTodoRequest, UpdateTodoRequest, Todo } from '../../../api/types';
import { useCreateTodo, useUpdateTodo } from '../../../hooks/useTodos';

interface TodoFormProps {
  todo?: Todo;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todo, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    priority: todo?.priority || 'medium' as const,
    dueDate: todo?.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    };

    try {
      if (todo) {
        // Update existing todo
        await updateTodo.mutateAsync({
          params: { id: todo.id },
          data: submitData as UpdateTodoRequest,
        });
      } else {
        // Create new todo
        await createTodo.mutateAsync(submitData as CreateTodoRequest);
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save todo:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const isLoading = createTodo.isPending || updateTodo.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        placeholder="Enter todo title..."
        required
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter todo description..."
          rows={3}
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority"
          value={formData.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <Input
        label="Due Date"
        type="date"
        value={formData.dueDate}
        onChange={(e) => handleChange('dueDate', e.target.value)}
      />

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : todo ? 'Update Todo' : 'Create Todo'}
        </Button>
      </div>
    </form>
  );
};