import "./TransactionCard.css";

function TransactionCard({ transaction }) {
    if (!transaction) return null;

    return (
        <div className="transaction-card">
            <h2>Transaction Details</h2>

            <div className="transaction-grid">

                <div>
                    <label>Merchant</label>
                    <p>{transaction.merchant}</p>
                </div>

                <div>
                    <label>Amount</label>
                    <p>${transaction.amount}</p>
                </div>

                <div>
                    <label>Category</label>
                    <p>{transaction.category}</p>
                </div>

                <div>
                    <label>Merchant Type</label>
                    <p>{transaction.merchantType}</p>
                </div>

                <div>
                    <label>Date</label>
                    <p>{transaction.transactionDate}</p>
                </div>

                <div>
                    <label>Receipt Number</label>
                    <p>{transaction.receiptNumber}</p>
                </div>

            </div>
        </div>
    );
}

export default TransactionCard;