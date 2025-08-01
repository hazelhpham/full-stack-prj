# Restaurant Management System

A full-stack web application for managing restaurant information with a modern React frontend and Node.js/Express backend.

## 🏗️ Architecture Overview

### Frontend (React + Vite)
- **Framework**: React 19 with Vite for fast development
- **Routing**: React Router DOM for navigation
- **State Management**: React Query for server state management
- **Styling**: CSS with modern responsive design
- **Error Handling**: React Error Boundary for graceful error handling
- **Code Quality**: ESLint + Prettier for consistent formatting

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express framework
- **Data Storage**: JSON file-based storage with in-memory caching
- **API**: RESTful endpoints for CRUD operations
- **Middleware**: CORS, JSON parsing, error handling
- **Port**: 5050 (configurable via environment variables)

## 📁 Project Structure

```
full-stack-prj/
├── backend/
│   ├── data/                    # JSON data storage
│   ├── routes/
│   │   └── restaurants.js       # API endpoints
│   ├── server.js               # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── restaurants/     # Restaurant-specific components
│   │   │   ├── EditModal.jsx   # Rating edit modal
│   │   │   ├── DeleteModal.jsx # Delete confirmation
│   │   │   ├── Toast.jsx       # Notification system
│   │   │   ├── ErrorBoundary.jsx # Error handling
│   │   │   ├── SearchFilters.jsx
│   │   │   └── SortDropdown.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx    # Main restaurant list
│   │   │   └── AddRestaurantPage.jsx
│   │   ├── utils/
│   │   │   ├── api.js          # API communication + React Query hooks
│   │   │   ├── search.js       # Search functionality
│   │   │   ├── sort.js         # Sorting algorithms
│   │   │   └── rating.jsx      # Rating utilities
│   │   ├── styles/             # Modular CSS files
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point with React Query setup
│   ├── .prettierrc            # Prettier configuration
│   ├── eslint.config.js       # ESLint configuration
│   └── package.json
└── README.md
```

## 🚀 Features

### Core Functionality
- **View Restaurants**: Display all restaurants in a responsive grid
- **Add Restaurants**: Form to add new restaurants with validation
- **Edit Ratings**: Inline rating updates with modal interface
- **Delete Restaurants**: Confirmation modal for safe deletion
- **Search & Filter**: Real-time search across restaurant names, types, and locations
- **Advanced Sorting**: Multiple sort options (name, rating, location, type, price)

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Toast Notifications**: Success/error feedback for all actions
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error handling with retry options
- **Search Index**: Optimized search with instant results
- **Error Boundaries**: Robust error handling with user-friendly messages

### Data Management
- **React Query Integration**: Automatic caching, background updates, and optimistic UI
- **Persistent Storage**: JSON file-based data persistence
- **Real-time Updates**: Immediate UI updates after operations
- **Data Validation**: Input validation on both frontend and backend
- **Default Data**: Pre-populated with sample restaurants

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Starts Vite dev server on port 3000
```

### Development Commands
```bash
# Linting and formatting
npm run lint          # Check for ESLint errors
npm run lint:fix      # Fix ESLint errors automatically
npm run format        # Format code with Prettier
npm run format:check  # Check if code is formatted

# Development
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

### Environment Configuration
Create `.env` file in backend directory:
```env
PORT=5050
```

## 🌐 API Endpoints

### RESTful Restaurant API (`/api/restaurants`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all restaurants |
| GET | `/:id` | Get single restaurant |
| POST | `/` | Create new restaurant |
| PUT | `/:id` | Update restaurant (full or partial) |
| DELETE | `/:id` | Delete restaurant |

### Request/Response Examples

**Create Restaurant:**
```json
POST /api/restaurants
{
  "name": "Pizza Palace",
  "type": "Italian",
  "location": "New York",
  "rating": 4.5,
  "description": "Best pizza in town",
  "priceRange": "$$",
  "image": "https://example.com/image.jpg"
}
```

**Update Rating:**
```json
PUT /api/restaurants/1
{
  "rating": 4.8
}
```

## 🔄 Data Flow

### React Query Integration
- **Automatic Caching**: 5-minute stale time for queries
- **Background Updates**: Data refreshes automatically
- **Optimistic Updates**: UI updates immediately, then syncs with server
- **Error Retry**: Automatic retry logic for failed requests
- **Cache Invalidation**: Lists update when data changes

### Frontend → Backend Communication
1. **React Query Hooks**: Centralized data fetching and mutations
2. **Error Handling**: Consistent error messages and network error handling
3. **Loading States**: Automatic loading indicators
4. **Real-time Updates**: Immediate UI updates after successful operations

### Backend Data Management
1. **File-based Storage**: JSON file persistence with in-memory caching
2. **Data Validation**: Input validation and error responses
3. **CRUD Operations**: Full Create, Read, Update, Delete functionality
4. **Error Handling**: Comprehensive error handling with appropriate HTTP status codes

## 🎨 UI/UX Features

### Design Principles
- **Modern Interface**: Clean, card-based layout
- **Responsive Grid**: Adaptive restaurant grid layout
- **Modal Dialogs**: Non-intrusive edit and delete confirmations
- **Toast Notifications**: Non-blocking user feedback
- **Loading States**: Visual feedback during operations
- **Error Boundaries**: Graceful error handling with retry options

### Component Architecture
- **Reusable Components**: Modular component structure
- **Props-based Communication**: Clean parent-child communication
- **Event Handling**: Centralized event management
- **State Lifting**: Proper state management patterns

## 🔍 Search Implementation

### Search Features
- **Multi-field Search**: Search across name, type, location
- **Real-time Results**: Instant search results as you type
- **Search Index**: Optimized search performance with indexing
- **Fuzzy Search**: Advanced search with partial matching
- **No Results Handling**: Clear messaging when no matches found

### Search Algorithm
```javascript
// Optimized search with indexing
const searchRestaurants = (restaurants, searchTerm) => {
  if (!searchTerm.trim()) return restaurants;
  
  const term = searchTerm.toLowerCase();
  const words = term.split(/\s+/).filter(word => word.length >= 2);
  
  // Use index for faster search
  const matchingIndices = new Set();
  
  words.forEach(word => {
    if (searchIndex.has(word)) {
      searchIndex.get(word).forEach(index => {
        matchingIndices.add(index);
      });
    }
  });
  
  return Array.from(matchingIndices).map(index => restaurants[index]);
};
```

## 🛠️ Development Workflow

### Development Process
1. **Frontend Development**: React components with Vite hot reload
2. **Backend Development**: Express server with nodemon auto-restart
3. **API Testing**: Test endpoints with tools like Postman
4. **Error Handling**: Comprehensive error handling on both ends
5. **Data Persistence**: File-based storage for development simplicity

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Automatic code formatting
- **React Query DevTools**: Development debugging tools
- **Component Structure**: Organized component hierarchy
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized rendering with useMemo

## 🚀 Deployment Considerations

### Frontend Deployment
- **Build Process**: `npm run build` creates optimized production build
- **Static Hosting**: Can be deployed to Vercel, Netlify, or similar
- **Environment Variables**: Configure API URL for production

### Backend Deployment
- **Environment Variables**: Configure PORT and other settings
- **Process Management**: Use PM2 or similar for production
- **Data Backup**: Regular backups of JSON data file
- **CORS Configuration**: Configure for production domains

## 📊 Performance Optimizations

### Frontend Optimizations
- **React Query Caching**: Automatic caching and background updates
- **Memoization**: useMemo for expensive computations
- **Lazy Loading**: Component lazy loading where appropriate
- **Search Index**: Pre-computed search index for fast queries
- **Debounced Search**: Optimized search input handling

### Backend Optimizations
- **In-memory Caching**: Cached restaurant data in memory
- **File I/O Optimization**: Efficient JSON file operations
- **Error Handling**: Comprehensive error handling without performance impact

## 🔒 Security Considerations

### Current Implementation
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper CORS setup for cross-origin requests
- **Error Messages**: Safe error messages without sensitive data exposure

### Production Recommendations
- **HTTPS**: Use HTTPS in production
- **Rate Limiting**: Implement API rate limiting
- **Input Sanitization**: Additional input sanitization
- **Authentication**: Add user authentication if needed

## 📈 Future Enhancements

### Potential Improvements
- **Database Integration**: Replace JSON storage with PostgreSQL/MongoDB
- **User Authentication**: Add user accounts and permissions
- **Image Upload**: Cloud storage for restaurant images
- **Advanced Filtering**: Price range, rating, and location filters
- **Pagination**: Handle large datasets efficiently
- **Real-time Updates**: WebSocket integration for live updates
- **Mobile App**: React Native version
- **Admin Panel**: Advanced management interface

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow ESLint and Prettier configurations
2. **Component Structure**: Maintain modular component design
3. **Error Handling**: Always include proper error handling
4. **Testing**: Test new features thoroughly
5. **Documentation**: Update documentation for new features

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React, Node.js, Express, and React Query** 
