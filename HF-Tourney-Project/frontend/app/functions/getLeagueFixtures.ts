import axios from "axios";

export const getLeagueFixtures = async (id: number) => {
  try {
    const API_URL = `http://localhost:8080/api/fixture/by-league/${id}`;
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
