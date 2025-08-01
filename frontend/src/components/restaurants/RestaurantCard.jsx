import React, { useState } from 'react'
import {renderStars} from '../../utils/rating'

const RestaurantCard = ({ name, type, image, location, rating, description, priceRange, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    setShowMenu(false);
    onEdit();
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete();
  };

  return (
    <div className="restaurant-card">
      <div className="card-header">
        <img src={image} alt={name} className="restaurant-image" />
        <div className="action-menu">
          <button 
            className="menu-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋮
          </button>
          {showMenu && (
            <div className="menu-dropdown">
              <button onClick={handleEdit} className="menu-item">
                ✏️ Edit
              </button>
              <button onClick={handleDelete} className="menu-item delete">
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="restaurant-info">
        <h2>{name}</h2>
        <p className="cuisine-type">{type}</p>
        <p className="location">{location}</p>
        <div className="rating">
          {renderStars(rating)}
          <span className="rating-text">({rating})</span>
        </div>
        <p className="description">{description}</p>
        <p className="price-range">{priceRange}</p>
      </div>
    </div>
  )
}

export { RestaurantCard }