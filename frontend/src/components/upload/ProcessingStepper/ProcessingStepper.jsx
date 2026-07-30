import "./ProcessingStepper.css";

const steps = [

    "Receipt Uploaded",

    "DONUT OCR",

    "Groq AI",

    "Validation",

    "Rules Engine",

    "Claim Generator",

    "Completed"

];

function ProcessingStepper({ currentStep }) {

    return (

        <div className="stepper">

            {steps.map((step,index)=>(

                <div
                    key={index}
                    className={`step ${
                        index<=currentStep
                        ?"active":""
                    }`}
                >

                    <div className="circle">

                        {index+1}

                    </div>

                    <span>

                        {step}

                    </span>

                </div>

            ))}

        </div>

    );

}

export default ProcessingStepper;