import React from 'react'
import {RestaurantCard} from './RestaurantCard'
import EditModal from '../EditModal'

const Restaurants = ({restaurants, onEdit, onDelete, editModal, setEditModal, handleSaveRating}) => {
  return (
    <>
        <div className="restaurant-grid">
          {restaurants.map((r) => (
            <RestaurantCard 
              key={r.id} 
              id={r.id} 
              name={r.name} 
              type={r.type} 
              image={r.image} 
              priceRange={r.priceRange} 
              description={r.description} 
              location={r.location} 
              rating={r.rating} 
              onEdit={() => onEdit(r)}
              onDelete={() => onDelete(r.id, r.name)}
            />
          ))}
        </div>

        {/* Edit Rating Modal */}
        {editModal.show && (
            <EditModal editModal={editModal} setEditModal={setEditModal} handleSaveRating={handleSaveRating}/>
        )}
    </>
  )
}

export default Restaurants