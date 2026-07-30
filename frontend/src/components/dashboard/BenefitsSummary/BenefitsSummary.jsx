import "./BenefitsSummary.css";

function BenefitsSummary({ benefits }) {

    return (

        <div className="benefits-summary">

            {benefits.map((b, index) => (

                <div
                    key={index}
                    className="benefit-item"
                >

                    <h3>{b.type}</h3>

                    <p>{b.count} Claims</p>

                </div>

            ))}

        </div>

    );

}

export default BenefitsSummary;