import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import RestaurantList from "../components/restaurants/RestaurantList";
import EditModal from "../components/EditModal";
import DeleteModal from '../components/DeleteModal';
import Toast from '../components/Toast';
import SortDropdown from '../components/SortDropdown';
import { searchRestaurants, initializeSearchIndex } from "../utils/search";
import { sortRestaurants, parseSortValue } from "../utils/sort";
import { 
  useRestaurants, 
  useUpdateRating, 
  useDeleteRestaurant,
  ERROR_MESSAGES, 
  SUCCESS_MESSAGES 
} from "../utils/api";

// Error fallback for HomePage
const HomePageErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="homepage-error">
      <div className="error-card">
        <h2>⚠️ Restaurant List Error</h2>
        <p>There was a problem loading the restaurant list.</p>
        <p className="error-detail">{error?.message || 'Unknown error'}</p>
        <div className="error-actions">
          <button onClick={resetErrorBoundary} className="retry-btn">
            🔄 Retry
          </button>
          <button onClick={() => window.location.reload()} className="reload-btn">
            🔄 Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePageContent = () => {
  const navigate = useNavigate();
  
  // React Query hooks
  const { 
    data: restaurants = [], 
    isLoading, 
    error, 
    refetch 
  } = useRestaurants();
  
  const updateRatingMutation = useUpdateRating();
  const deleteRestaurantMutation = useDeleteRestaurant();
  
  // Local state
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
  const [sortValue, setSortValue] = useState('name-asc');
  
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };
  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // Initialize search index when restaurants data changes
  React.useEffect(() => {
    if (restaurants.length > 0) {
      initializeSearchIndex(restaurants);
    }
  }, [restaurants]);

  const updateRestaurantRating = async (restaurantId, newRating) => {
    try {
      await updateRatingMutation.mutateAsync({ id: restaurantId, rating: newRating });
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
      await deleteRestaurantMutation.mutateAsync(restaurantId);
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

  //Open edit modal & initialize state
  const handleEdit = (restaurant) => {
    setEditModal({
      show: true,
      restaurant,
      newRating: restaurant.rating.toString() || "",
      error: "",
    });
  };
  
  //Validate and save the edited rating
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
    setEditModal({ show: false, restaurant: null, newRating: '', error: '' });
 
    setDeleteModal({
      show: true,
      restaurantId,
      restaurantName
    });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, restaurantId: null, restaurantName: '' });
  };

  const handleSortChange = (newSortValue) => {
    setSortValue(newSortValue);
  };

  const filteredAndSortedRestaurants = useMemo(() => {
    // First filter by search
    let result = restaurants;
    if (searchInput.trim()) {
      result = searchRestaurants(restaurants, searchInput);
    }
    
    // Then sort the filtered results
    const { sortBy, sortOrder } = parseSortValue(sortValue);
    return sortRestaurants(result, sortBy, sortOrder);
  }, [restaurants, searchInput, sortValue]);

  const hasSearchResults = filteredAndSortedRestaurants.length > 0;
  const isSearching = searchInput.trim().length > 0;

  // Loading and error states
  if (isLoading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Error: {error?.message || 'An unknown error occurred'}
        <button onClick={() => refetch()} className="retry-btn">
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

      {/* Search and Sort Controls */}
      <div className="controls-container">
        <input
          type="text"
          placeholder="Search restaurants..."
          onChange={handleSearchChange}
          value={searchInput}
          className="search-input"
        />
        <SortDropdown 
          sortValue={sortValue}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Restaurant Grid */}
      <div className="restaurant-grid">
        {isSearching && !hasSearchResults ? (
          <div className="no-results">
            No restaurants found matching "{searchInput}"
          </div>
        ) : (
          <RestaurantList
            restaurants={filteredAndSortedRestaurants}
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

const HomePage = () => {
  return (
    <ErrorBoundary FallbackComponent={HomePageErrorFallback}>
      <HomePageContent />
    </ErrorBoundary>
  );
};

export default HomePage;
