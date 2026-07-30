import "./ClaimTimeline.css";

const steps = [
    "Generated",
    "Documents Ready",
    "Submitted",
    "Under Review",
    "Approved"
];

function ClaimTimeline({ currentStep }) {

    return (

        <div className="timeline">

            {steps.map((step,index)=>(

                <div

                    key={index}

                    className={`timeline-step ${
                        index<=currentStep
                        ?"active":""
                    }`}

                >

                    <div className="timeline-circle">

                        {index+1}

                    </div>

                    <p>{step}</p>

                </div>

            ))}

        </div>

    );

}

export default ClaimTimeline;