import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantAddPage from './pages/AddRestaurantPage';
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/add" element={<RestaurantAddPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;