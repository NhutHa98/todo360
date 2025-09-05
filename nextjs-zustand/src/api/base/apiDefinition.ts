export interface ApiEndpointDefinition<TRequest = any, TResponse = any, TParams = any> {
  url: string | ((params: TParams) => string);
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  queryKey: (params?: TParams) => readonly string[];
  requestType?: TRequest;
  responseType?: TResponse;
  buildUrl?: (params?: TParams) => string;
}

// Helper to generate query keys based on URL patterns
export const createQueryKey = (baseUrl: string, params?: any): readonly string[] => {
  const segments = baseUrl.split('/').filter(Boolean);
  
  if (!params) {
    return segments;
  }

  // Add parameters to query key for cache differentiation
  const paramKey = Object.keys(params).length > 0 
    ? JSON.stringify(params).replace(/[{}":]/g, '').replace(/,/g, '-')
    : '';
    
  return paramKey ? [...segments, paramKey] : segments;
};

// Dynamic URL builder
export const buildUrl = (template: string, params: Record<string, any> = {}): string => {
  let url = template;
  
  // Replace path parameters like /todos/:id
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, String(value));
  });
  
  return url;
};

// Query parameter builder
export const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};