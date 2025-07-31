import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Groups from './pages/Groups';
import GroupGoals from './pages/GroupGoals'; // ⬅️ Import the new component
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Register />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/groups" element={
          <ProtectedRoute><Groups /></ProtectedRoute>
        } />
        
        {/* <Route path="/goals" element={
          <ProtectedRoute><Goals /></ProtectedRoute>
        } /> */}
        
        <Route path="/groups/:groupId/goals" element={  // ⬅️ New dynamic route
          <ProtectedRoute><GroupGoals /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
