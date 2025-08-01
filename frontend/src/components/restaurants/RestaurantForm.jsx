import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateRestaurant,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../../utils/api';
import Toast from '../Toast';

const RestaurantForm = () => {
  const navigate = useNavigate();
  const createRestaurantMutation = useCreateRestaurant();

  const [restaurant, setRestaurant] = useState({
    name: '',
    type: '',
    image: '',
    location: '',
    rating: '',
    description: '',
    priceRange: '$$',
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };
  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const updateRestaurant = useCallback(
    (field, value) => {
      setRestaurant(prev => ({ ...prev, [field]: value }));
      //IF THERE ARE ERRORS ---> CLEAR ALL FIELDS
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    },
    [errors]
  ); //re-render when the type of error is a different type!
  //This prevents the function from being recreated unnecessarily unless errors change.

  const validateForm = () => {
    const newErrors = {};
    const rating = parseFloat(restaurant.rating);
    if (!restaurant.name.trim()) newErrors.name = 'Restaurant name is required';
    if (!restaurant.type) newErrors.type = 'Cuisine type is required';
    if (!restaurant.location.trim())
      newErrors.location = 'Location is required';
    if (!restaurant.rating.trim()) newErrors.rating = 'Rating is required';
    if (rating && (rating < 0 || rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    //return the keys of an object!
  };

  const handleSubmitForm = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createRestaurantMutation.mutateAsync(restaurant);
      showToast(SUCCESS_MESSAGES.CREATED, 'success');
      setTimeout(() => {
        navigate('/');
      }, 1000); //flow: accepted -> success -> redirect back to main page
    } catch (error) {
      const errorMessage = error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      showToast(errorMessage, 'error');
      setErrors({ submit: errorMessage });
    }
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateRestaurant('image', imageUrl);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <form className="form-card" onSubmit={handleSubmitForm}>
        <div className="form-section">
          <label htmlFor="name" className="form-label">
            Restaurant Name *
          </label>
          <input
            id="name"
            type="text"
            value={restaurant.name}
            onChange={e => updateRestaurant('name', e.target.value)}
            placeholder="Enter restaurant name"
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        {/* Cuisine Type */}
        <div className="form-section">
          <label htmlFor="type" className="form-label">
            Cuisine Type *
          </label>
          <select
            id="type"
            value={restaurant.type}
            onChange={e => updateRestaurant('type', e.target.value)}
            className={`form-select ${errors.type ? 'error' : ''}`}
          >
            <option value="">Select cuisine type</option>
            <option value="Japanese">Japanese</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="French">French</option>
            <option value="Other">Other</option>
          </select>
          {errors.type && <p className="error-message">{errors.type}</p>}
        </div>

        {/* Location */}
        <div className="form-section">
          <label htmlFor="location" className="form-label">
            Location *
          </label>
          <input
            id="location"
            type="text"
            value={restaurant.location}
            onChange={e => updateRestaurant('location', e.target.value)}
            placeholder="Enter city or address"
            className={`form-input ${errors.location ? 'error' : ''}`}
          />
          {errors.location && (
            <p className="error-message">{errors.location}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-section">
          <label htmlFor="image" className="form-label">
            Restaurant Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="form-file"
          />
          {restaurant.image && (
            <div className="image-preview">
              <img src={restaurant.image} alt="Restaurant preview" />
            </div>
          )}
        </div>

        <div className="form-grid">
          {/* Rating */}
          <div className="form-section">
            <label htmlFor="rating" className="form-label">
              Rating (0-5)
            </label>
            <input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={restaurant.rating}
              onChange={e => updateRestaurant('rating', e.target.value)}
              placeholder="4.5"
              className={`form-input ${errors.rating ? 'error' : ''}`}
            />
            {errors.rating && <p className="error-message">{errors.rating}</p>}
          </div>

          {/* Price Range */}
          <div className="form-section">
            <label htmlFor="priceRange" className="form-label">
              Price Range
            </label>
            <select
              id="priceRange"
              value={restaurant.priceRange}
              onChange={e => updateRestaurant('priceRange', e.target.value)}
              className="form-select"
            >
              <option value="$">$ (Budget) - Under $15</option>
              <option value="$$">$$ (Moderate) - $15-30</option>
              <option value="$$$">$$$ (Expensive) - $30+</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="form-section">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            value={restaurant.description}
            onChange={e => updateRestaurant('description', e.target.value)}
            placeholder="Tell us about this restaurant..."
            className="form-textarea"
            rows="4"
          />
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="submit-error">
            <p>{errors.submit}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={createRestaurantMutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createRestaurantMutation.isPending}
            className="btn btn-primary"
          >
            {createRestaurantMutation.isPending
              ? 'Adding Restaurant...'
              : 'Add Restaurant'}
          </button>
        </div>
      </form>
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
};

export default RestaurantForm;
