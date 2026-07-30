import "./EligibilityBadge.css";

function EligibilityBadge({ eligible }) {

    return(

        <span

            className={
                eligible
                ?"eligible"
                :"not-eligible"
            }

        >

            {eligible

                ?"Eligible"

                :"Not Eligible"}

        </span>

    );

}

export default EligibilityBadge;