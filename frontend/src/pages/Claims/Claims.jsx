import { useEffect, useState } from "react";
import axios from "axios";

import "./Claims.css";

import Layout from "../../components/layout/Layout/Layout";
import PageHeader from "../../components/layout/PageHeader/PageHeader";

import ClaimCard from "../../components/claims/ClaimCard/ClaimCard";
import ClaimTimeline from "../../components/claims/ClaimTimeline/ClaimTimeline";
import RequiredDocuments from "../../components/claims/RequiredDocuments/RequiredDocuments";

import Loader from "../../components/common/Loader/Loader";

function Claims() {

    const [claims, setClaims] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchClaims();

    }, []);

    const fetchClaims = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5001/api/transactions"
            );

            let allClaims = [];

            res.data.forEach(transaction => {

                if(transaction.claims){

                    transaction.claims.forEach(claim=>{

                        allClaims.push({

                            ...claim,

                            merchant:transaction.merchant,

                            amount:transaction.amount

                        });

                    });

                }

            });

            setClaims(allClaims);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <Layout>

            <PageHeader

                title="Generated Claims"

                subtitle="Automatically prepared claims ready for submission"

            />

            {

                loading ?

                <Loader/>

                :

                claims.map((claim,index)=>(

                    <div

                        className="claim-wrapper"

                        key={index}

                    >

                        <ClaimCard

                            claim={claim}

                        />

                        <ClaimTimeline

                            currentStep={1}

                        />

                        <RequiredDocuments

                            documents={[

                                {
                                    name:"Receipt",
                                    available:true
                                },

                                {
                                    name:"Credit Card Statement",
                                    available:true
                                },

                                {
                                    name:"Purchase Invoice",
                                    available:false
                                }

                            ]}

                        />

                    </div>

                ))

            }

        </Layout>

    );

}

export default Claims;