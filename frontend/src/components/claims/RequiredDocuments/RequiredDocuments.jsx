import "./RequiredDocuments.css";
import {
    FaFileInvoice,
    FaCheckCircle
} from "react-icons/fa";

function RequiredDocuments({ documents }) {

    return (

        <div className="documents-card">

            <h3>

                Required Documents

            </h3>

            {documents.map((doc,index)=>(

                <div

                    className="document-row"

                    key={index}

                >

                    <FaFileInvoice/>

                    <span>

                        {doc.name}

                    </span>

                    {doc.available && (

                        <FaCheckCircle
                            className="check"
                        />

                    )}

                </div>

            ))}

        </div>

    );

}

export default RequiredDocuments;