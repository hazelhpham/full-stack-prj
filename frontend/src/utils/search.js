export const searchRestaurants = (restaurants, searchTerm) => {
  if (!searchTerm.trim()) return restaurants;
  
  const term = searchTerm.toLowerCase();
  
  return restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(term) ||
    restaurant.type.toLowerCase().includes(term) ||
    restaurant.location.toLowerCase().includes(term) ||
    restaurant.description.toLowerCase().includes(term)
  );
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