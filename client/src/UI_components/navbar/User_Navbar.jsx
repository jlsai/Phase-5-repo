import { Link, NavLink } from "react-router-dom";
import './Navbar.css'

function Header() {
  return (
    <div style={{ color: 'white' }}>
        <nav>
            <div className="flex items-center">
                <NavLink to="/" className="Title  ml-2 text-lg font-semibold" style={{ color: 'white' }}>Flatboxd</NavLink>
                <img src='/src/UI_components/navbar/logoMobile.png' className="Logo ml-4 transform scale-75" alt="Logo" />
                

                <NavLink className="navitem ml-2 text-lg font-semibold" style={{ color: 'white' }}>
                    Sign up
                </NavLink>

                <NavLink to="/movies" className="navitem ml-2 text-lg font-semibold" style={{ color: 'white' }}>
                    All films
                </NavLink>

                <NavLink to="/" className="navitem ml-2 text-lg font-semibold" style={{ color: 'white' }}>
                    Profile
                </NavLink>
            </div>
        </nav>        
    </div>
  );
}

export default Header;

