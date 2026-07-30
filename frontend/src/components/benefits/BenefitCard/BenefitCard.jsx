import "./BenefitCard.css";
import EligibilityBadge from "../EligibilityBadge/EligibilityBadge";
import {
    FaShieldAlt,
    FaCalendarAlt,
    FaFileAlt,
    FaDollarSign
} from "react-icons/fa";

function BenefitCard({ benefit }) {

    return (
        <div className="benefit-card">

            <div className="benefit-header">

                <h2>{benefit.benefitType}</h2>

                <EligibilityBadge
                    eligible={benefit.eligible}
                />

            </div>

            <p className="benefit-reason">
                {benefit.reason}
            </p>

            <div className="benefit-details">

                <div>
                    <FaDollarSign />
                    <span>
                        Estimated Payout
                    </span>
                    <strong>
                        ${benefit.estimatedPayout}
                    </strong>
                </div>

                <div>
                    <FaCalendarAlt />
                    <span>
                        Deadline
                    </span>
                    <strong>
                        {benefit.claimDeadlineDays} Days
                    </strong>
                </div>

            </div>

            <div className="documents">

                <FaFileAlt />

                <div>

                    <h4>Required Documents</h4>

                    <ul>

                        {benefit.proofRequired.map((doc,index)=>(
                            <li key={index}>
                                {doc}
                            </li>
                        ))}

                    </ul>

                </div>

            </div>

            <button>

                {benefit.nextAction}

            </button>

        </div>
    );

}

export default BenefitCard;