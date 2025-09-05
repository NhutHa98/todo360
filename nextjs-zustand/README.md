# Professional Todo App Boilerplate

A modern, scalable Todo application built with Next.js, TypeScript, and a professional API architecture. This boilerplate follows enterprise-level patterns and can be easily adapted for future projects.

## 🏗️ Architecture

### API Layer Structure
```
src/api/
├── config/           # Axios configuration and interceptors
├── base/            # Core API definitions and helpers
├── types/           # All DTOs and entities (one per file)
│   ├── entities/    # Domain entities
│   ├── dto/
│   │   ├── request/ # Request DTOs (one per file)
│   │   ├── response/# Response DTOs (one per file)
│   │   └── params/  # Parameter DTOs (one per file)
│   └── common.ts    # Shared API types
├── endpoints/       # API endpoint definitions with HTTP method + path keys
└── controllers/     # API controllers using endpoints
```

### Key Features

- **🔗 Centralized API Management**: All endpoints defined with HTTP method + path naming (e.g., `'POST /todos'`)
- **📝 Separate DTOs**: Each request/response DTO in its own file for better maintainability
- **🔍 Dynamic Query Keys**: Query keys automatically generated from URL patterns
- **⚡ Type Safety**: Full TypeScript support with proper type inference
- **🎯 React Query Integration**: Optimistic updates and intelligent caching
- **📦 Modular Components**: Feature-based component organization
- **🛠️ Professional Structure**: Enterprise-ready patterns and practices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your API URL.

3. **Start development server:**
   ```bash
   pnpm dev
   ```

## 📝 API Usage Examples

### Basic Todo Operations

```typescript
// Using hooks (recommended)
const { data: todos, isLoading } = useTodos({ status: 'pending' });
const createTodo = useCreateTodo();

// Create a new todo
createTodo.mutate({
  title: 'New Task',
  priority: 'high',
  dueDate: new Date('2024-12-31')
});

// Using controllers directly
import { todoController } from '@/api/controllers/todoController';

const todos = await todoController.getTodos({ 
  status: 'pending', 
  page: 1, 
  limit: 10 
});
```

### Advanced Operations

```typescript
// Search todos
const searchResults = await todoController.searchTodos({
  query: 'urgent tasks',
  filters: { priority: 'high' }
});

// Bulk operations
await todoController.bulkCreateTodos({
  todos: [
    { title: 'Task 1', priority: 'medium' },
    { title: 'Task 2', priority: 'low' }
  ]
});

// Toggle todo status
const toggleTodo = useToggleTodo();
toggleTodo.mutate({ id: 'todo-123' });
```

## 🏷️ Endpoint Structure

All endpoints follow the `HTTP_METHOD /path` naming convention:

```typescript
TODO_ENDPOINTS = {
  'GET /todos': { /* List todos with filters */ },
  'GET /todos/:id': { /* Get single todo */ },
  'POST /todos': { /* Create todo */ },
  'PUT /todos/:id': { /* Update todo */ },
  'DELETE /todos/:id': { /* Delete todo */ },
  'POST /todos/search': { /* Search todos */ },
  'PATCH /todos/:id/toggle': { /* Toggle completion */ },
  'POST /todos/bulk': { /* Bulk create */ },
  'DELETE /todos/bulk': { /* Bulk delete */ },
}
```

## 📋 DTO Examples

### Request DTOs
```typescript
// CreateTodoRequest
{
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

// TodoListParams  
{
  status?: 'completed' | 'pending';
  priority?: 'low' | 'medium' | 'high';
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
}
```

### Response DTOs
```typescript
// TodoResponse
{
  data: Todo;
  message: string;
  status: 'success' | 'error';
  timestamp: string;
}

// TodoListResponse (Paginated)
{
  data: Todo[];
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
```

## 🎨 Component Structure

### UI Components
- `Button`: Reusable button with variants (primary, secondary, outline, ghost, destructive)
- `Input`: Form input with label and error handling

### Feature Components
- `TodoItem`: Individual todo display with actions
- `TodoList`: Todo listing with pagination
- `TodoForm`: Create/edit todo form with validation

### Usage Example
```tsx
import { TodoList, TodoForm } from '@/components/features/todos';
import { Button } from '@/components/ui/Button';

export default function TodoPage() {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <Button onClick={() => setShowForm(true)}>
          Add Todo
        </Button>
      </div>
      
      {showForm && (
        <TodoForm 
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      <TodoList filters={{ status: 'pending' }} />
    </div>
  );
}
```

## 🔧 Extending the Boilerplate

### Adding New Features

1. **Create DTOs** in separate files:
   ```typescript
   // src/api/types/dto/request/createUserRequest.ts
   export interface CreateUserRequest {
     name: string;
     email: string;
   }
   ```

2. **Define endpoints**:
   ```typescript
   // src/api/endpoints/userEndpoints.ts
   export const USER_ENDPOINTS = {
     'GET /users': { /* ... */ },
     'POST /users': { /* ... */ },
   }
   ```

3. **Create controller**:
   ```typescript
   // src/api/controllers/userController.ts
   export class UserController {
     async getUsers() { /* ... */ }
     async createUser(data: CreateUserRequest) { /* ... */ }
   }
   ```

4. **Add React Query hooks**:
   ```typescript
   // src/hooks/useUsers.ts
   export const useUsers = () => useQuery({ /* ... */ });
   export const useCreateUser = () => useMutation({ /* ... */ });
   ```

### Backend Integration

This structure perfectly matches backend APIs generated from:
- **Swagger/OpenAPI** specifications
- **NestJS** controllers
- **Express** with proper routing
- **ASP.NET Core** Web APIs

## 📦 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **HTTP Client**: Axios with interceptors
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## 🔒 Best Practices

- ✅ One DTO per file for better maintainability
- ✅ HTTP method + path naming for endpoints
- ✅ Type-safe API calls with proper error handling
- ✅ Centralized query key management
- ✅ Consistent error handling with interceptors
- ✅ Optimistic updates for better UX
- ✅ Proper loading and error states
- ✅ Component separation by feature

## 📄 License

MIT License - feel free to use this boilerplate for your projects!

---

**Ready to build something amazing? This boilerplate gives you a solid foundation for any modern web application!** 🚀
