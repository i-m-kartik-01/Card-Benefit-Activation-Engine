import { useEffect, useState } from "react";
import axios from "axios";

import "./Benefits.css";

import Layout from "../../components/layout/Layout/Layout";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import BenefitList from "../../components/benefits/BenefitList/BenefitList";
import Loader from "../../components/common/Loader/Loader";

function Benefits() {

    const [benefits, setBenefits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBenefits();
    }, []);

    const fetchBenefits = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5001/api/transactions"
            );

            let allBenefits = [];

            res.data.forEach(transaction => {

                if (transaction.benefits) {

                    transaction.benefits.forEach(benefit => {

                        allBenefits.push({

                            ...benefit,

                            merchant: transaction.merchant,

                            amount: transaction.amount,

                            transactionDate: transaction.transactionDate

                        });

                    });

                }

            });

            setBenefits(allBenefits);

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

                title="Eligible Benefits"

                subtitle="All benefits identified from your uploaded receipts"

            />

            {

                loading ?

                <Loader />

                :

                <BenefitList

                    benefits={benefits}

                />

            }

        </Layout>

    );

}

export default Benefits;