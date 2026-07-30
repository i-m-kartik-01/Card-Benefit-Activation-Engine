import { useState } from "react";

import {

    uploadReceipt

} from "../services/transactionService";

export default function useUploadReceipt(){

    const [progress,setProgress]=useState(0);

    const [loading,setLoading]=useState(false);

    const upload=async(file)=>{

        const formData=new FormData();

        formData.append("receipt",file);

        setLoading(true);

        const result=await uploadReceipt(

            formData,

            event=>{

                setProgress(

                    Math.round(

                        event.loaded*100/event.total

                    )

                );

            }

        );

        setLoading(false);

        return result;

    };

    return{

        upload,

        progress,

        loading

    };

}