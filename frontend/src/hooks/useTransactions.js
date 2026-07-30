import { useEffect, useState } from "react";

import {

    getTransactions

} from "../services/transactionService";

export default function useTransactions(){

    const [transactions,setTransactions]=useState([]);

    const [loading,setLoading]=useState(true);

    const [error,setError]=useState(null);

    useEffect(()=>{

        fetchTransactions();

    },[]);

    const fetchTransactions=async()=>{

        try{

            const data=await getTransactions();

            setTransactions(data);

        }

        catch(err){

            setError(err);

        }

        finally{

            setLoading(false);

        }

    };

    return{

        transactions,

        loading,

        error,

        refresh:fetchTransactions

    };

}