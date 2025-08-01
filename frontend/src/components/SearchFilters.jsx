import React from 'react';

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  cuisineFilter,
  onCuisineChange,
  priceFilter,
  onPriceChange,
  ratingFilter,
  onRatingChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="search-filters">
      <div className="search-section">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Cuisine Type</label>
          <select
            value={cuisineFilter}
            onChange={e => onCuisineChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Cuisines</option>
            <option value="Japanese">Japanese</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="French">French</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range</label>
          <select
            value={priceFilter}
            onChange={e => onPriceChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="$">$ (Budget)</option>
            <option value="$$">$$ (Moderate)</option>
            <option value="$$$">$$$ (Expensive)</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Min Rating</label>
          <select
            value={ratingFilter}
            onChange={e => onRatingChange(parseFloat(e.target.value))}
            className="filter-select"
          >
            <option value={0}>Any Rating</option>
            <option value={3}>3+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={4.5}>4.5+ Stars</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="filter-select"
          >
            <option value="name">Name A-Z</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="price">Price (Low to High)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
