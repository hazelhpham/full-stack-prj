import React from 'react';
import { getSortOptions } from '../utils/sort';

const SortDropdown = ({ sortValue, onSortChange }) => {
  const sortOptions = getSortOptions();

  return (
    <div className="sort-container">
      <label htmlFor="sort-select" className="sort-label">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortValue}
        onChange={e => onSortChange(e.target.value)}
        className="sort-dropdown"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
