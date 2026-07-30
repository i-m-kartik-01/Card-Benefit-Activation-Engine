import "./UploadProgress.css";

function UploadProgress({ progress }) {

    return (

        <div className="progress-wrapper">

            <div
                className="progress-bar"
                style={{
                    width:`${progress}%`
                }}
            />

            <span>

                {progress}%

            </span>

        </div>

    );

}

export default UploadProgress;