const express = require('express');
const router = express.Router();

// In-memory storage (replace with database in production)
let restaurants = [
  {
    id: 1,
    name: "Sakura Sushi",
    type: "Japanese",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    location: "New York",
    rating: 4.5,
    description: "Authentic Japanese sushi and sashimi prepared by master chefs.",
    priceRange: "$$"
  },
  {
    id: 2,
    name: "Trattoria Bella",
    type: "Italian",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    location: "Los Angeles",
    rating: 4.2,
    description: "Family-owned Italian restaurant serving homemade pasta.",
    priceRange: "$$$"
  }
];

// GET all restaurants
router.get('/', (req, res) => {
  try {
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
});

// GET single restaurant
router.get('/:id', (req, res) => {
  try {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
});

// POST new restaurant
router.post('/', (req, res) => {
  try {
    const { name, type, image, location, rating, description, priceRange } = req.body;
    if (!name || !type || !location) {
      return res.status(400).json({ message: 'Name, type, and location are required' });
    }
    
    const newRestaurant = {
      id: restaurants.length > 0 ? Math.max(...restaurants.map(r => r.id)) + 1 : 1,
      name,
      type,
      image: image || '',
      location,
      rating: rating ? parseFloat(rating) : 0,
      description: description || '',
      priceRange: priceRange || '$$'
    };
    
    restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating restaurant' });
  }
});

// PUT update restaurant
router.put('/:id', (req, res) => {
  try {
    const { name, type, image, location, rating, description, priceRange } = req.body;
    const restaurantIndex = restaurants.findIndex(r => r.id === parseInt(req.params.id));
    
    if (restaurantIndex === -1) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    // Update only provided fields (partial update support)
    const updatedRestaurant = {
      ...restaurants[restaurantIndex],
      ...(name !== undefined && { name }),
      ...(type !== undefined && { type }),
      ...(image !== undefined && { image }),
      ...(location !== undefined && { location }),
      ...(rating !== undefined && { rating: parseFloat(rating) }),
      ...(description !== undefined && { description }),
      ...(priceRange !== undefined && { priceRange })
    };
    
    restaurants[restaurantIndex] = updatedRestaurant;
    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: 'Error updating restaurant' });
  }
});

// DELETE restaurant
router.delete('/:id', (req, res) => {
  try {
    const restaurantIndex = restaurants.findIndex(r => r.id === parseInt(req.params.id));
    
    if (restaurantIndex === -1) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    restaurants.splice(restaurantIndex, 1);
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant' });
  }
});

module.exports = router;
