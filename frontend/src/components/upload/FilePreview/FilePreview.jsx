import "./FilePreview.css";

function FilePreview({ file }) {

    if (!file) return null;

    const image =
        file.type.startsWith("image");

    return (

        <div className="preview-card">

            <h3>Selected File</h3>

            <p><strong>Name:</strong> {file.name}</p>

            <p><strong>Size:</strong> {(file.size/1024).toFixed(2)} KB</p>

            {image && (

                <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                />

            )}

        </div>

    );

}

export default FilePreview;