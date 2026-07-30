import "./RecentTransactions.css";

function RecentTransactions({ transactions }) {

    return (

        <table className="recent-table">

            <thead>

                <tr>

                    <th>Merchant</th>

                    <th>Amount</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                {transactions.map(tx => (

                    <tr key={tx._id}>

                        <td>{tx.merchant}</td>

                        <td>${tx.amount}</td>

                        <td>{tx.status}</td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default RecentTransactions;