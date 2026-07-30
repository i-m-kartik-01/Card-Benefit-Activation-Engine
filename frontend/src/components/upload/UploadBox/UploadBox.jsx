import "./UploadBox.css";
import { FaCloudUploadAlt } from "react-icons/fa";

function UploadBox({ onFileSelect }) {

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div className="upload-box">

            <label htmlFor="receipt-upload">

                <FaCloudUploadAlt className="upload-icon"/>

                <h2>Upload Receipt</h2>

                <p>Drag & Drop or Click to Browse</p>

                <span>
                    PNG • JPG • JPEG • PDF
                </span>

            </label>

            <input
                id="receipt-upload"
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleChange}
            />

        </div>
    );
}

export default UploadBox;