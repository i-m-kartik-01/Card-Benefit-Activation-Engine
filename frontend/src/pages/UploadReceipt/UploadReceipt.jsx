import { useState } from "react";
import axios from "axios";

import "./UploadReceipt.css";

import Layout from "../../components/layout/Layout/Layout";
import PageHeader from "../../components/layout/PageHeader/PageHeader";

import UploadBox from "../../components/upload/UploadBox/UploadBox";
import FilePreview from "../../components/upload/FilePreview/FilePreview";
import UploadProgress from "../../components/upload/UploadProgress/UploadProgress";
import ProcessingStepper from "../../components/upload/ProcessingStepper/ProcessingStepper";

import TransactionCard from "../../components/transaction/TransactionCard/TransactionCard";
import ItemList from "../../components/transaction/ItemList/ItemList";
import BenefitList from "../../components/benefits/BenefitList/BenefitList";
import ClaimCard from "../../components/claims/ClaimCard/ClaimCard";

function UploadReceipt() {

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(-1);

    const [transaction, setTransaction] = useState(null);
    const [benefits, setBenefits] = useState([]);
    const [claims, setClaims] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a receipt.");
            return;
        }

        const formData = new FormData();
        formData.append("receipt", file);

        try {

            setLoading(true);

            const response = await axios.post(

                "http://localhost:5001/api/transactions/upload",

                formData,

                {

                    headers: {
                        "Content-Type": "multipart/form-data"
                    },

                    onUploadProgress: (event) => {

                        const percent = Math.round(
                            (event.loaded * 100) / event.total
                        );

                        setProgress(percent);

                    }

                }

            );

            const data = response.data;

            setCurrentStep(6);

            setTransaction(data.transaction);

            setBenefits(data.transaction.benefits);

            setClaims(data.transaction.claims);

        }

        catch (err) {

            console.error(err);

            alert("Upload Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <PageHeader
                title="Upload Receipt"
                subtitle="Upload a receipt and automatically discover eligible card benefits."
            />

            <UploadBox
                onFileSelect={setFile}
            />

            {file && (

                <>

                    <FilePreview file={file} />

                    <button
                        className="upload-btn"
                        onClick={handleUpload}
                    >
                        Upload Receipt
                    </button>

                </>

            )}

            {loading && (

                <>

                    <UploadProgress
                        progress={progress}
                    />

                    <ProcessingStepper
                        currentStep={currentStep}
                    />

                </>

            )}

            {transaction && (

                <>

                    <div className="result-grid">

                        <TransactionCard
                            transaction={transaction}
                        />

                        <ItemList
                            items={transaction.items}
                        />

                    </div>

                    <div className="benefits-section">

                        <h2>

                            Eligible Benefits

                        </h2>

                        <BenefitList
                            benefits={benefits}
                        />

                    </div>

                    <div className="claims-section">

                        <h2>

                            Generated Claims

                        </h2>

                        {claims.map((claim, index) => (

                            <ClaimCard
                                key={index}
                                claim={claim}
                            />

                        ))}

                    </div>

                </>

            )}

        </Layout>

    );

}

export default UploadReceipt;