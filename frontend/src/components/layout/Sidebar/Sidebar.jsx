import "./Sidebar.css";
import {
    FaHome,
    FaUpload,
    FaHistory,
    FaChartBar
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {

    const menu = [
        { name: "Dashboard", icon: <FaHome />, path: "/" },
        { name: "Upload", icon: <FaUpload />, path: "/upload" },
        { name: "History", icon: <FaHistory />, path: "/history" },
        { name: "Analytics", icon: <FaChartBar />, path: "/analytics" }
    ];

    return (
        <aside className="sidebar">

            <h2>AMEX AI</h2>

            {menu.map(item => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className="sidebar-link"
                >
                    {item.icon}
                    <span>{item.name}</span>
                </NavLink>
            ))}

        </aside>
    );
}

export default Sidebar;