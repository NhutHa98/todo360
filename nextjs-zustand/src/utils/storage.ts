export class StorageService {
  private static isClient = typeof window !== 'undefined';

  static save<T>(key: string, data: T): void {
    if (this.isClient) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  }

  static load<T>(key: string): T | null {
    if (this.isClient) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  static remove(key: string): void {
    if (this.isClient) {
      localStorage.removeItem(key);
    }
  }

  static clear(): void {
    if (this.isClient) {
      localStorage.clear();
    }
  }

  // Todo-specific storage methods
  static saveTodos(todos: any[]): void {
    this.save('todos', todos);
  }

  static loadTodos(): any[] {
    return this.load('todos') || [];
  }

  static saveAuthToken(token: string): void {
    this.save('authToken', token);
  }

  static loadAuthToken(): string | null {
    return this.load('authToken');
  }

  static removeAuthToken(): void {
    this.remove('authToken');
  }
}

export default StorageService;