import "./BenefitList.css";
import BenefitCard from "../BenefitCard/BenefitCard";

function BenefitList({ benefits }) {

    if(!benefits.length){

        return(

            <p>No eligible benefits found.</p>

        );

    }

    return(

        <div className="benefit-list">

            {benefits.map((benefit,index)=>(

                <BenefitCard

                    key={index}

                    benefit={benefit}

                />

            ))}

        </div>

    );

}

export default BenefitList;