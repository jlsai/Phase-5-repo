import { Link, NavLink } from "react-router-dom";
import './Navbar.css';
import { useUser } from '/src/UserContext';

import HeadshotBlank from '/src/assets/HeadshotBlank.jpg';

function Header() {
    const { user, setUser } = useUser(); // Destructure user and setUser here

    const handleLogout = () => {
        // Clear user data upon logout
        setUser(null); // Set user data to null
    };

    return (
        <div className="nav flex items-center p-4" style={{ color: 'white' }}>
            <nav>
                <div className="flex items-center">
                    {user ? (
                        <div className="user ml-4 flex items-center">
                            <span className="text-lg font-semibold" style={{ color: 'white' }}>{user.username}</span>
                            <img
                                src={HeadshotBlank}
                                alt="Profile"
                                className="icon" // Use rounded-full to make the image rounded
                            />
                        </div>
                    ) : null}
                </div>
                <div className="flex items-center"> {/* New flex container */}
                    <NavLink to="/" className="Title ml-2 text-xl font-bold" style={{ color: 'white' }}>Flatboxd</NavLink>

                    <img src='/src/UI_components/navbar/logoMobile.png' className="Logo ml-4 transform scale-75" alt="Logo" />

                    {user ? ( // Render "Logout" NavLink if the user is logged in, or "Sign up" NavLink if not
                        <NavLink to="/" className="navitem ml-2 text-lg font-semibold" style={{ color: 'white' }} onClick={handleLogout}>
                            Logout
                        </NavLink>
                    ) : (
                        <NavLink to="/signup" className="navitem ml-2 text-lg font-semibold" style={{ color: 'white' }}>
                            Sign up
                        </NavLink>
                    )}

                    <NavLink to="/movies" className="navitem ml-2 text-lg font-semibold" style={{ color: 'white' }}>
                        All films
                    </NavLink>

                    <NavLink to="/user" className="navitem ml-2 text-lg font-semibold" style={{ color: 'white' }}>
                        Profile
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Header;
