import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./History.css";

import Layout from "../../components/layout/Layout/Layout";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import Loader from "../../components/common/Loader/Loader";
import EmptyState from "../../components/common/EmptyState/EmptyState";

function History() {

    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {

        const filtered = transactions.filter(tx =>
            tx.merchant.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredTransactions(filtered);

    }, [search, transactions]);

    const fetchTransactions = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5001/api/transactions"
            );

            setTransactions(res.data);
            setFilteredTransactions(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <PageHeader
                title="Transaction History"
                subtitle="Browse all processed receipts"
            />

            <input
                className="history-search"
                placeholder="Search by merchant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {

                loading ?

                <Loader />

                :

                filteredTransactions.length === 0 ?

                <EmptyState
                    title="No Transactions Found"
                    description="Try another search."
                />

                :

                <table className="history-table">

                    <thead>

                        <tr>

                            <th>Merchant</th>

                            <th>Category</th>

                            <th>Amount</th>

                            <th>Date</th>

                            <th>Benefits</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredTransactions.map(tx => (

                                <tr

                                    key={tx._id}

                                    onClick={() =>
                                        navigate(`/transaction/${tx._id}`)
                                    }

                                >

                                    <td>{tx.merchant}</td>

                                    <td>{tx.category}</td>

                                    <td>${tx.amount}</td>

                                    <td>{tx.transactionDate}</td>

                                    <td>{tx.benefits?.length || 0}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            }

        </Layout>

    );

}

export default History;