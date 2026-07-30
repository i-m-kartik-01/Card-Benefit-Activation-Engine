import api from "./api";

export const getBenefits = async () => {

    const response = await api.get("/benefits");

    return response.data;

};