import axios from "axios";

export const getTeamData = async (id: number) => {
  try {
    const API_URL = `http://localhost:8080/api/team/${id}`;
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
