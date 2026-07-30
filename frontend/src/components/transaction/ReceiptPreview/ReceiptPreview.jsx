import "./ReceiptPreview.css";

function ReceiptPreview({ image }) {

    if (!image) return null;

    return (

        <div className="receipt-preview">

            <h2>Receipt Preview</h2>

            <img
                src={image}
                alt="Receipt"
            />

        </div>

    );

}

export default ReceiptPreview;