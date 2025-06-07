import { NavLink } from 'react-router-dom';
import '../styles/BottomNav.css';

function BottomNav() {
  return (
    <nav className="navbar">
      <NavLink to="/life" className="nav-item">Жизнь</NavLink>
      <NavLink to="/training" className="nav-item">Тренировки</NavLink>
      <NavLink to="/calculator" className="nav-item">Калькуляторы</NavLink>
      <NavLink to="/stats" className="nav-item">Статистика</NavLink>
    </nav>
  );
}

export default BottomNav;
