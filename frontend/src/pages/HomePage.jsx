import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantList from "../components/restaurants/RestaurantList";
import EditModal from "../components/EditModal";
import DeleteModal from '../components/DeleteModal';
import Toast from '../components/Toast';
import { searchRestaurants } from "../utils/search";
import { restaurantAPI, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/api";

const HomePage = () => {
  const navigate = useNavigate();
  
  // State management
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [editModal, setEditModal] = useState({ 
    show: false, 
    restaurant: null, 
    newRating: '', 
    error: '' 
  });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    restaurantId: null,
    restaurantName: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Hide toast notification
  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // API functions
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await restaurantAPI.getAll();
      setRestaurants(data);
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateRestaurantRating = async (restaurantId, newRating) => {
    try {
      const updatedRestaurant = await restaurantAPI.updateRating(restaurantId, newRating);
      setRestaurants(prev =>
        prev.map(restaurant =>
          restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
        )
      );
      showToast(SUCCESS_MESSAGES.RATING_UPDATED, 'success');
      return true;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.SERVER_ERROR;
      showToast(errorMessage, 'error');
      return false;
    }
  };

  const deleteRestaurant = async (restaurantId) => {
    try {
      await restaurantAPI.delete(restaurantId);
      setRestaurants(prev => prev.filter(restaurant => restaurant.id !== restaurantId));
      showToast(SUCCESS_MESSAGES.DELETED, 'success');
      return true;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.SERVER_ERROR;
      showToast(errorMessage, 'error');
      return false;
    }
  };

  // Event handlers
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleAddRestaurant = () => {
    navigate("/restaurants/add");
  };

  const handleEdit = (restaurant) => {
    setEditModal({
      show: true,
      restaurant,
      newRating: restaurant.rating.toString(),
      error: "",
    });
  };

  const handleSaveRating = async () => {
    const rating = parseFloat(editModal.newRating);
    
    if (rating < 0 || rating > 5) {
      setEditModal(prev => ({ 
        ...prev, 
        error: 'Please enter a rating between 0 and 5' 
      }));
      return;
    }

    const success = await updateRestaurantRating(editModal.restaurant.id, rating);
    
    if (success) {
      setEditModal({ show: false, restaurant: null, newRating: '', error: '' });
    } else {
      setEditModal(prev => ({ 
        ...prev, 
        error: 'Failed to update rating. Please try again.' 
      }));
    }
  };

  const handleDeleteClick = (restaurantId, restaurantName) => {
    setDeleteModal({
      show: true,
      restaurantId,
      restaurantName
    });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, restaurantId: null, restaurantName: '' });
  };

  // Computed values
  const filteredRestaurants = searchInput 
    ? searchRestaurants(restaurants, searchInput) 
    : restaurants;

  const hasSearchResults = filteredRestaurants.length > 0;
  const isSearching = searchInput.trim().length > 0;

  // Effects
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Loading and error states
  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}
        <button onClick={fetchRestaurants} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Header */}
      <div className="header-section">
        <h1>My Restaurant List</h1>
        <button className="add-restaurant-btn" onClick={handleAddRestaurant}>
          <span className="btn-icon">+</span>
          Add Restaurant
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search restaurants..."
        onChange={handleSearchChange}
        value={searchInput}
        className="search-input"
      />

      {/* Restaurant Grid */}
      <div className="restaurant-grid">
        {isSearching && !hasSearchResults ? (
          <div className="no-results">
            No restaurants found matching "{searchInput}"
          </div>
        ) : (
          <RestaurantList
            restaurants={filteredRestaurants}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            editModal={editModal}
            setEditModal={setEditModal}
            handleSaveRating={handleSaveRating}
          />
        )}
      </div>

      {/* Edit Modal */}
      {editModal.show && (
        <EditModal 
          editModal={editModal} 
          setEditModal={setEditModal} 
          handleSaveRating={handleSaveRating}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <DeleteModal 
          deleteModal={deleteModal} 
          setDeleteModal={setDeleteModal} 
          handleDeleteCancel={handleDeleteCancel} 
          deleteRestaurant={deleteRestaurant}
        />
      )}

      {/* Toast Notifications */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

export default HomePage;
