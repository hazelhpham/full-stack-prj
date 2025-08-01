import React from 'react';

const DeleteModal = ({
  handleDeleteCancel,
  deleteRestaurant,
  deleteModal,
  setDeleteModal,
}) => {
  const handleDeleteConfirm = async () => {
    const success = await deleteRestaurant(deleteModal.restaurantId);
    if (!success) {
      alert('Failed to delete restaurant. Please try again.');
    }

    setDeleteModal({ show: false, restaurantId: null, restaurantName: '' });
  };

  return (
    <div>
      <div className="modal-overlay" onClick={handleDeleteCancel}>
        <div
          className="modal-content delete-modal"
          onClick={e => e.stopPropagation()}
        >
          <h3>Delete Restaurant</h3>
          <p>
            Are you sure you want to delete{' '}
            <strong>{deleteModal.restaurantName}</strong>?
          </p>
          <p className="warning-text">This action cannot be undone.</p>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={handleDeleteCancel}>
              Cancel
            </button>
            <button className="btn-delete" onClick={handleDeleteConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
