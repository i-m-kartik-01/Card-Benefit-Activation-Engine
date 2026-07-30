import "./Dashboard.css";

import Layout from "../../components/layout/Layout/Layout";
import PageHeader from "../../components/layout/PageHeader/PageHeader";

import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import SpendingChart from "../../components/dashboard/SpendingChart/SpendingChart";
import BenefitsSummary from "../../components/dashboard/BenefitsSummary/BenefitsSummary";
import TransactionTable from "../../components/transaction/TransactionTable/TransactionTable";

import {
    FaReceipt,
    FaGift,
    FaFileInvoiceDollar,
    FaDollarSign
} from "react-icons/fa";

function Dashboard() {

    const stats = [
        {
            title: "Transactions",
            value: 42,
            icon: <FaReceipt />
        },
        {
            title: "Benefits Found",
            value: 17,
            icon: <FaGift />
        },
        {
            title: "Claims Generated",
            value: 11,
            icon: <FaFileInvoiceDollar />
        },
        {
            title: "Estimated Savings",
            value: "$4,823",
            icon: <FaDollarSign />
        }
    ];

    const chartData = [
        { month: "Jan", amount: 900 },
        { month: "Feb", amount: 1200 },
        { month: "Mar", amount: 850 },
        { month: "Apr", amount: 1500 },
        { month: "May", amount: 2100 },
        { month: "Jun", amount: 1800 }
    ];

    const benefits = [
        {
            type: "Purchase Protection",
            count: 9
        },
        {
            type: "Return Protection",
            count: 5
        },
        {
            type: "Extended Warranty",
            count: 3
        }
    ];

    const transactions = [
        {
            _id: 1,
            merchant: "Apple Store",
            amount: 1817.92,
            category: "Retail",
            transactionDate: "27 Jul 2026",
            benefits: [1]
        },
        {
            _id: 2,
            merchant: "Amazon",
            amount: 124.50,
            category: "Shopping",
            transactionDate: "25 Jul 2026",
            benefits: [1]
        },
        {
            _id: 3,
            merchant: "Uber",
            amount: 22.15,
            category: "Transport",
            transactionDate: "24 Jul 2026",
            benefits: []
        }
    ];

    return (

        <Layout>

            <PageHeader
                title="Dashboard"
                subtitle="Overview of your transactions and card benefits"
            />

            {/* Stats */}

            <div className="stats-grid">

                {stats.map((item) => (

                    <StatsCard
                        key={item.title}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                    />

                ))}

            </div>

            {/* Middle Section */}

            <div className="dashboard-middle">

                <div className="chart-card">

                    <h2>Monthly Spending</h2>

                    <SpendingChart
                        data={chartData}
                    />

                </div>

                <div className="benefit-card-dashboard">

                    <h2>Benefit Summary</h2>

                    <BenefitsSummary
                        benefits={benefits}
                    />

                </div>

            </div>

            {/* Recent Transactions */}

            <div className="dashboard-table">

                <h2>

                    Recent Transactions

                </h2>

                <TransactionTable

                    transactions={transactions}

                />

            </div>

        </Layout>

    );

}

export default Dashboard;