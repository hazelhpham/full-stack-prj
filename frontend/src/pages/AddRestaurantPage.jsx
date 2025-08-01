import React from 'react';
import './AddRestaurantPage.css';
import RestaurantForm from '../components/restaurants/RestaurantForm';

const AddRestaurantPage = () => {

    return (
        <div className="add-restaurant-page">
            <div className="header-section">
                <div className="header-container">
                    <div className="header-content">
                        <h1 className="header-title">Add New Restaurant</h1>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT: FORM COMPONENT */}
            <div className="form-container">
                <RestaurantForm/>
            </div>
        </div>
    );
};

export default AddRestaurantPage;