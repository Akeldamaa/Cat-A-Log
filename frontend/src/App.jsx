import * as React from 'react';
import { Routes, Route} from 'react-router-dom';

import UserDashboard from './components/pages/UserDashboard';
import Home from './components/pages/Home';
import Login from './components/pages/Login';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="user-dashboard" element={<UserDashboard />}/>
        {/* Add more paths here in future */}
      </Routes>
    </div>
  )
}
