import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantAddPage from './pages/AddRestaurantPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants/add" element={<RestaurantAddPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;