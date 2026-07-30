import "./TransactionTable.css";
import Badge from "../../common/Badge/Badge";

function TransactionTable({ transactions }) {

    return (

        <table className="transaction-table">

            <thead>

                <tr>
                    <th>Merchant</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>

            </thead>

            <tbody>

                {transactions.map(tx => (

                    <tr key={tx._id}>

                        <td>{tx.merchant}</td>

                        <td>${tx.amount}</td>

                        <td>{tx.category}</td>

                        <td>{tx.transactionDate}</td>

                        <td>

                            <Badge
                                status={
                                    tx.benefits.length
                                    ? "Eligible"
                                    : "Pending"
                                }
                            />

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default TransactionTable;