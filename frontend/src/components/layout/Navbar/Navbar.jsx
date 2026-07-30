import "./Navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-title">
                Card Benefits Auto Claim
            </div>

            <div className="navbar-right">
                <FaBell className="nav-icon" />
                <FaUserCircle className="profile-icon" />
            </div>
        </nav>
    );
}

export default Navbar;