import React from "react";

const EditModal = ({ editModal, setEditModal, handleSaveRating }) => {
  return (
    <div>
      <div
        className="modal-overlay"
        onClick={() =>
          setEditModal({
            show: false,
            restaurant: null,
            newRating: "",
            error: "",
          })
        }
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
          <h3>Edit Rating</h3>
          <p>
            Restaurant: <strong>{editModal.restaurant?.name}</strong>
          </p>
          <div className="rating-input">
            <label htmlFor="rating-input">New Rating (0-5):</label>
            <input
              id="rating-input"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={editModal.newRating}
              onChange={(e) =>
                setEditModal((prev) => ({ ...prev, newRating: e.target.value }))
              }
              placeholder="Enter rating"
            />
          </div>
          {editModal.error && (
            <div className="error-message">{editModal.error}</div>
          )}
          <div className="modal-actions">
            <button
              className="btn-cancel"
              onClick={() =>
                setEditModal({
                  show: false,
                  restaurant: null,
                  newRating: "",
                  error: "",
                })
              }
            >
              Cancel
            </button>
            <button className="btn-save" onClick={handleSaveRating}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
