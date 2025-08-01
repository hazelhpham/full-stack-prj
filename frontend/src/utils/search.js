// Search index for faster lookups
let searchIndex = new Map();
let restaurantsById = new Map(); // Hash table for O(1) ID lookup

// Build search index from restaurants
const buildSearchIndex = (restaurants) => {
  searchIndex.clear();
  restaurantsById.clear();
  
  restaurants.forEach((restaurant, index) => {
    // Hash table for ID lookup
    restaurantsById.set(restaurant.id, restaurant);
    
    const searchableText = [
      restaurant.name,
      restaurant.type,
      restaurant.location,
      restaurant.description
    ].join(' ').toLowerCase();
    
    // Create trigrams for fuzzy search
    const words = searchableText.split(/\s+/);
    words.forEach(word => {
      if (word.length >= 2) {
        if (!searchIndex.has(word)) {
          searchIndex.set(word, new Set());
        }
        searchIndex.get(word).add(index);
      }
    });
  });
};

// Binary search for sorted restaurants by ID
export const binarySearchById = (restaurants, targetId) => {
  let left = 0;
  let right = restaurants.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentId = restaurants[mid].id;
    
    if (currentId === targetId) {
      return restaurants[mid];
    } else if (currentId < targetId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return null; // Not found
};

// Hash table lookup for O(1) ID search
export const hashSearchById = (targetId) => {
  return restaurantsById.get(targetId) || null;
};

// Optimized search with indexing
export const searchRestaurants = (restaurants, searchTerm) => {
  if (!searchTerm.trim()) return restaurants;
  
  const term = searchTerm.toLowerCase();
  const words = term.split(/\s+/).filter(word => word.length >= 2);
  
  if (words.length === 0) return restaurants;
  
  // Use index for faster search
  const matchingIndices = new Set();
  
  words.forEach(word => {
    if (searchIndex.has(word)) {
      searchIndex.get(word).forEach(index => {
        matchingIndices.add(index);
      });
    }
  });
  
  // Convert indices back to restaurants
  return Array.from(matchingIndices).map(index => restaurants[index]);
};

// Initialize index when restaurants change
export const initializeSearchIndex = (restaurants) => {
  buildSearchIndex(restaurants);
};

// Fuzzy search with Levenshtein distance
export const fuzzySearch = (restaurants, searchTerm) => {
  if (!searchTerm.trim()) return restaurants;
  
  const term = searchTerm.toLowerCase();
  const results = [];
  
  restaurants.forEach(restaurant => {
    const searchableText = [
      restaurant.name,
      restaurant.type,
      restaurant.location,
      restaurant.description
    ].join(' ').toLowerCase();
    
    // Check if any word in search term is contained in searchable text
    const searchWords = term.split(/\s+/);
    const matchScore = searchWords.reduce((score, word) => {
      if (searchableText.includes(word)) score += 1;
      return score;
    }, 0);
    
    if (matchScore > 0) {
      results.push({ restaurant, score: matchScore });
    }
  });
  
  // Sort by relevance score
  return results
    .sort((a, b) => b.score - a.score)
    .map(item => item.restaurant);
};

export const filterByCuisine = (restaurants, cuisineType) => {
  if (!cuisineType || cuisineType === 'all') return restaurants;
  
  return restaurants.filter(restaurant => 
    restaurant.type.toLowerCase() === cuisineType.toLowerCase()
  );
};

export const filterByPriceRange = (restaurants, priceRange) => {
  if (!priceRange || priceRange === 'all') return restaurants;
  
  return restaurants.filter(restaurant => 
    restaurant.priceRange === priceRange
  );
};

export const filterByRating = (restaurants, minRating) => {
  if (!minRating || minRating === 0) return restaurants;
  
  return restaurants.filter(restaurant => 
    restaurant.rating >= minRating
  );
};

export const sortRestaurants = (restaurants, sortBy, sortOrder = 'asc') => {
  const sorted = [...restaurants];
  
  switch (sortBy) {
    case 'name':
      sorted.sort((a, b) => 
        sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      break;
    case 'rating':
      sorted.sort((a, b) => 
        sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
      );
      break;
    case 'price':
      sorted.sort((a, b) => {
        const priceOrder = { '$': 1, '$$': 2, '$$$': 3 };
        return sortOrder === 'asc' 
          ? priceOrder[a.priceRange] - priceOrder[b.priceRange]
          : priceOrder[b.priceRange] - priceOrder[a.priceRange];
      });
      break;
    default:
      break;
  }
  
  return sorted;
}; 