import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTransactionById } from '../services/api';
import './TransactionDetails.css';

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTransaction();
  }, [id]);

  const loadTransaction = async () => {
    try {
      const result = await getTransactionById(id);
      setTx(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="transaction-details">
        <h1 className="page-title">Transaction Details</h1>
        <div className="loading-state">Loadi        <div className="loading-state">Loadi        <div className="l (
      <div className="transaction-details">
        <h1 className="page-title">Transaction Details</h1>
        <div className="error-state">
          <h3>Transaction not found</h3>
          <button className="btn btn-primary" onClick={() => navigate('/history')}>
            Back to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-details">
      <h1 className="page-title">Transaction Details</h1>

      <div className="details-grid">
        <div className="card main-info">
          <h3>Transaction Info</h3>
          <div className="info-row">
            <span className="info-label">Merchant</span>
            <span className="info-value">{tx.merchant}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Amount</span>
            <span className="info-value">${tx.amount?.toFixed(2)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Date</span>
            <span className="info-value">{tx.transactionDate}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Category</span>
            <span className="info-value">{tx.category}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Merchant Type</span>
            <span className="info-value">{tx.merchantType}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Receipt #</span>
            <span className="info-value">{tx.receiptNumber || 'N/A'}</span>
          </div>
        </div>

        <div className="card">
          <h3>Items</h3>
          {tx.items && tx.items.length > 0 ? (
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {tx.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No items</p>
          )}
        </div>

        <div className="card">
          <h3>Benefits Detected</h3>
          {tx.benefits && tx.benefits.length > 0 ? (
            <div className="benefits-list">
              {tx.benefits.map((benefit, idx) => (
                <div key={idx} className="benefit-item">
                  <div className="benefit-header">
                    <span className="benefit-type">{benefit.benefitType}</span>
                    <span className="benefit-amount">${benefit.amountEligible?.toFixed(2)}</span>
                  </div>
                  <p className="benefit-reason">{benefit.reason}</p>
                  <div className="benefit-proof">
                    <strong>Proof required:</strong>
                    <ul>
                      {benefit.proofRequired?.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No benefits detected</p>
          )}
        </div>

        <div className="card">
          <h3>Claims</h3>
          {tx.claims && tx.claims.length > 0 ? (
            <div className="claims-list">
              {tx.claims.map((claim, idx) => (
                <div key={idx} className="claim-item">
                  <div className="claim-header">
                    <span className="claim-type">{claim.benefitType}</span>
                    <span className={`status-badge ${claim.status}`}>{claim.status}</span>
                  </div>
                  <div className="claim-amount">
                    <strong>${claim.eligibleAmount?.toFixed(2)}</strong>
                  </div>
                  {claim.requiredDocuments && claim.requiredDocuments.length > 0 && (
                    <div className="claim-documents">
                      <strong>Required:</strong>
                      <ul>
                        {claim.requiredDocuments.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No claims generated</p>
          )}
        </div>
      </div>
    </div>
  );
}
