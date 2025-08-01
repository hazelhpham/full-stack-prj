const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5050/api/restaurants';

const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Restaurant not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

const SUCCESS_MESSAGES = {
  CREATED: 'Restaurant created successfully!',
  UPDATED: 'Restaurant updated successfully!',
  DELETED: 'Restaurant deleted successfully!',
  RATING_UPDATED: 'Rating updated successfully!',
};

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    throw error;
  }
};

export const restaurantAPI = {
  // Get all restaurants
  getAll: async () => {
    return await apiRequest('');
  },

  getById: async id => {
    return await apiRequest(`/${id}`);
  },

  // Create new restaurant
  create: async restaurantData => {
    return await apiRequest('', {
      method: 'POST',
      body: JSON.stringify(restaurantData),
    });
  },

  // Update restaurant
  update: async (id, restaurantData) => {
    return await apiRequest(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(restaurantData),
    });
  },

  // Update only rating
  updateRating: async (id, rating) => {
    return await apiRequest(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ rating }),
    });
  },

  // Delete restaurant
  delete: async id => {
    return await apiRequest(`/${id}`, {
      method: 'DELETE',
    });
  },
};

// React Query hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query keys
export const restaurantKeys = {
  all: ['restaurants'],
  lists: () => [...restaurantKeys.all, 'list'],
  list: filters => [...restaurantKeys.lists(), { filters }],
  details: () => [...restaurantKeys.all, 'detail'],
  detail: id => [...restaurantKeys.details(), id],
};

// Custom hooks
export const useRestaurants = () => {
  return useQuery({
    queryKey: restaurantKeys.lists(),
    queryFn: restaurantAPI.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRestaurant = id => {
  return useQuery({
    queryKey: restaurantKeys.detail(id),
    queryFn: () => restaurantAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restaurantAPI.create,
    onSuccess: () => {
      // Invalidate and refetch restaurants list
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
    },
  });
};

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => restaurantAPI.update(id, data),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(restaurantKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
    },
  });
};

export const useUpdateRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, rating }) => restaurantAPI.updateRating(id, rating),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(restaurantKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restaurantAPI.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: restaurantKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
    },
  });
};

export { ERROR_MESSAGES, SUCCESS_MESSAGES };
