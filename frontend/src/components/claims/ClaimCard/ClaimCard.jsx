import "./ClaimCard.css";
import {
    FaMoneyBillWave,
    FaCalendarAlt,
    FaCheckCircle
} from "react-icons/fa";

function ClaimCard({ claim }) {

    return (
        <div className="claim-card">

            <div className="claim-header">

                <h2>{claim.benefitType}</h2>

                <span className={`status ${claim.status.toLowerCase()}`}>
                    {claim.status}
                </span>

            </div>

            <div className="claim-grid">

                <div>
                    <FaMoneyBillWave />
                    <span>Estimated Amount</span>
                    <strong>${claim.estimatedAmount}</strong>
                </div>

                <div>
                    <FaCalendarAlt />
                    <span>Deadline</span>
                    <strong>{claim.deadline}</strong>
                </div>

            </div>

            <button>

                <FaCheckCircle />

                Submit Claim

            </button>

        </div>
    );

}

export default ClaimCard;