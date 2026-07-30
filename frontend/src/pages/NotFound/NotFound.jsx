import { useNavigate } from "react-router-dom";
import "./NotFound.css";

import Button from "../../components/common/Button/Button";

function NotFound() {

    const navigate = useNavigate();

    return (

        <div className="not-found-container">

            <h1 className="error-code">404</h1>

            <h2>Page Not Found</h2>

            <p>
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>

            <Button
                text="Go to Dashboard"
                onClick={() => navigate("/")}
            />

        </div>

    );

}

export default NotFound;