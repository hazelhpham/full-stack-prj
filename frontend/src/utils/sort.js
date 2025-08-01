const sortRestaurants = (restaurants, sortBy, sortOrder = 'asc') => {
  const sorted = [...restaurants];

  switch (sortBy) {
    case 'name':
      sorted.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
      break;

    case 'rating':
      sorted.sort((a, b) => {
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      });
      break;

    case 'location':
      sorted.sort((a, b) => {
        const locationA = a.location.toLowerCase();
        const locationB = b.location.toLowerCase();
        return sortOrder === 'asc'
          ? locationA.localeCompare(locationB)
          : locationB.localeCompare(locationA);
      });
      break;

    case 'type':
      sorted.sort((a, b) => {
        const typeA = a.type.toLowerCase();
        const typeB = b.type.toLowerCase();
        return sortOrder === 'asc'
          ? typeA.localeCompare(typeB)
          : typeB.localeCompare(typeA);
      });
      break;

    case 'priceRange': {
      const priceOrder = { $: 1, $$: 2, $$$: 3, $$$$: 4 };
      sorted.sort((a, b) => {
        const priceA = priceOrder[a.priceRange] || 0;
        const priceB = priceOrder[b.priceRange] || 0;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
      break;
    }

    default:
      // Default: sort by name ascending
      sorted.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
  }

  return sorted;
};

// Get sort options for dropdown
const getSortOptions = () => [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'rating-desc', label: 'Rating (High to Low)' },
  { value: 'rating-asc', label: 'Rating (Low to High)' },
  { value: 'location-asc', label: 'Location (A-Z)' },
  { value: 'location-desc', label: 'Location (Z-A)' },
  { value: 'type-asc', label: 'Type (A-Z)' },
  { value: 'type-desc', label: 'Type (Z-A)' },
  { value: 'priceRange-asc', label: 'Price (Low to High)' },
  { value: 'priceRange-desc', label: 'Price (High to Low)' },
];

// Parse sort value to get sortBy and sortOrder
const parseSortValue = sortValue => {
  const [sortBy, sortOrder] = sortValue.split('-');
  return { sortBy, sortOrder };
};

export { sortRestaurants, getSortOptions, parseSortValue };
