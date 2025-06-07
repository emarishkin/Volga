import { Routes, Route, Navigate } from 'react-router-dom';

import './styles/App.css';
import BottomNav from './components/BottomNav';
import LifePage from './pages/LifePage';


function App() {
  return (
      <div className="app-container">
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/life" />} />
            <Route path="/life" element={<LifePage />} />
          </Routes>
        </div>
       <BottomNav />
      </div>
  );
}

export default App;
