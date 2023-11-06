import { Link, NavLink } from "react-router-dom";
import './Navbar.css';
import { useUser } from '/src/UserContext';
import HeadshotBlank from '/src/assets/HeadshotBlank.jpg';

function Header() {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        // Clear user data upon logout
        setUser(null); // Set user data to null
    };

    return (
        <div className="header-container">
            <nav className="header">
                <div className="header-logo">
                    <img src='/src/UI_components/navbar/logoMobile.png' className="header-logo-img" alt="Logo" />
                    <NavLink to="/" className="header-title">Flatboxd</NavLink>
                </div>
                <div className="header-nav">
                    <ul className="nav-items">
                        <li className="nav-item">
                            <NavLink to="/movies" className="nav-link">All films</NavLink>
                        </li>
                        {user ? (
                            <li className="nav-item">
                                <NavLink to="/user" className="nav-link">Profile</NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link">Sign up</NavLink>
                            </li>
                        )}
                        {user && (
                            <li className="nav-item">
                                <a className="nav-link" onClick={handleLogout}>Logout</a>
                            </li>
                        )}
                    </ul>
                    {user && (
                        <div className="user-info">
                            <img
                                src={HeadshotBlank}
                                alt="Profile"
                                className="user-icon"
                            />
                            <p className="user-username">{user.username}</p>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Header;
