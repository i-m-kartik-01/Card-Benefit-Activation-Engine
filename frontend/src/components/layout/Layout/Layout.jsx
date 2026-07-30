import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

import "./Layout.css";

function Layout({ children }) {
    return (
        <div className="layout">
            <Sidebar />

            <div className="layout-content">
                <Navbar />

                <main className="page-content">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default Layout;