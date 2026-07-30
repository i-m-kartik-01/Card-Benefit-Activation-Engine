import { useState } from 'react';
import { uploadReceipt } from '../services/api';
import './Upload.css';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError('');
      setSuccess(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setPreview(URL.createObjectURL(dropped));
      setError('');
      setSuccess(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a receipt image.');
      return;
    }

    const formData = new FormData();
    formData.append('receipt', file);
    formData.append('cardType', 'amex_platinum');

    setLoading(true);
    setError('');

    try {
      await uploadReceipt(formData);
      setSuccess(true);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload">
      <h1 className="page-title">Upload Receipt</h1>

      {success && (
        <div className="success-message">
          Receipt uploaded successfully! Your transaction is being processed.
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="card">
          <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="preview">
                <img src={preview} alt="Receipt preview" />
                <button
                  type="button"
                  className="remove-preview"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="dropzone-content">
                <div className="dropzone-icon">📤</div>
                <p>Drag and drop your receipt here, or click to browse</p>
                <span className="dropzone-hint">Supports JPG, JPEG, PNG up to 10MB</span>
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileChange}
              hidden
              id="file-input"
            />
          </div>

          {!preview && (
            <button
              type="button"
              className="btn btn-outline browse-btn"
              onClick={() => document.getElementById('file-input').click()}
            >
              Browse Files
            </button>
          )}
        </div>

        <div className="upload-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!file || loading}
          >
            {loading ? 'Processing...' : 'Upload & Process'}
          </button>
        </div>
      </form>
    </div>
  );
}