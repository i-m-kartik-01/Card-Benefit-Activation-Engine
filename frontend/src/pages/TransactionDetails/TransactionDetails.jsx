import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./TransactionDetails.css";

import Layout from "../../components/layout/Layout/Layout";
import PageHeader from "../../components/layout/PageHeader/PageHeader";

import ReceiptPreview from "../../components/transaction/ReceiptPreview/ReceiptPreview";
import TransactionCard from "../../components/transaction/TransactionCard/TransactionCard";
import ItemList from "../../components/transaction/ItemList/ItemList";

import BenefitList from "../../components/benefits/BenefitList/BenefitList";

import ClaimCard from "../../components/claims/ClaimCard/ClaimCard";
import ClaimTimeline from "../../components/claims/ClaimTimeline/ClaimTimeline";
import RequiredDocuments from "../../components/claims/RequiredDocuments/RequiredDocuments";

function TransactionDetails() {

    const { id } = useParams();

    const [transaction, setTransaction] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchTransaction();

    }, []);

    const fetchTransaction = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5001/api/transactions/${id}`
            );

            setTransaction(res.data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    if(loading){

        return(

            <Layout>

                <h2>Loading...</h2>

            </Layout>

        );

    }

    if(!transaction){

        return(

            <Layout>

                <h2>Transaction Not Found</h2>

            </Layout>

        );

    }

    return(

        <Layout>

            <PageHeader

                title="Transaction Details"

                subtitle="Complete AI analysis of your receipt"

            />

            <div className="top-section">

                <ReceiptPreview

                    image={transaction.receiptImage}

                />

                <TransactionCard

                    transaction={transaction}

                />

            </div>

            <div className="section">

                <h2>Purchased Items</h2>

                <ItemList

                    items={transaction.items}

                />

            </div>

            <div className="section">

                <h2>Eligible Benefits</h2>

                <BenefitList

                    benefits={transaction.benefits}

                />

            </div>

            <div className="section">

                <h2>Generated Claims</h2>

                {

                    transaction.claims.map((claim,index)=>(

                        <ClaimCard

                            key={index}

                            claim={claim}

                        />

                    ))

                }

            </div>

            <div className="section">

                <h2>Claim Progress</h2>

                <ClaimTimeline

                    currentStep={2}

                />

            </div>

            <div className="section">

                <RequiredDocuments

                    documents={[

                        {
                            name:"Receipt",
                            available:true
                        },

                        {
                            name:"Card Statement",
                            available:true
                        },

                        {
                            name:"Purchase Invoice",
                            available:false
                        }

                    ]}

                />

            </div>

        </Layout>

    );

}

export default TransactionDetails;