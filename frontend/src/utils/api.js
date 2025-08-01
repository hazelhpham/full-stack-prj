// API Configuration
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5050/api/restaurants';

const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Restaurant not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

const SUCCESS_MESSAGES = {
  CREATED: 'Restaurant created successfully!',
  UPDATED: 'Restaurant updated successfully!',
  DELETED: 'Restaurant deleted successfully!',
  RATING_UPDATED: 'Rating updated successfully!'
};

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
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

// Restaurant API functions
export const restaurantAPI = {
  // Get all restaurants
  getAll: async () => {
    return await apiRequest('');
  },

  // Get single restaurant
  getById: async (id) => {
    return await apiRequest(`/${id}`);
  },

  // Create new restaurant
  create: async (restaurantData) => {
    return await apiRequest('', {
      method: 'POST',
      body: JSON.stringify(restaurantData)
    });
  },

  // Update restaurant
  update: async (id, restaurantData) => {
    return await apiRequest(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(restaurantData)
    });
  },

  // Update only rating
  updateRating: async (id, rating) => {
    return await apiRequest(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ rating })
    });
  },

  // Delete restaurant
  delete: async (id) => {
    return await apiRequest(`/${id}`, {
      method: 'DELETE'
    });
  }
};

export { ERROR_MESSAGES, SUCCESS_MESSAGES };
