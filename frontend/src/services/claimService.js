import api from "./api";

export const getClaims = async () => {

    const response = await api.get("/claims");

    return response.data;

};