import api from "./api";

export const getTransactions = async () => {

    const response = await api.get("/transactions");

    return response.data;

};

export const getTransactionById = async (id) => {

    const response = await api.get(`/transactions/${id}`);

    return response.data;

};

export const uploadReceipt = async (formData, onUploadProgress) => {

    const response = await api.post(

        "/transactions/upload",

        formData,

        {

            headers: {

                "Content-Type":"multipart/form-data"

            },

            onUploadProgress

        }

    );

    return response.data;

};