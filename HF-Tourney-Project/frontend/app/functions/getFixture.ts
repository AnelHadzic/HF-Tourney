import axios from "axios";

export const getFixture = async (id: number) => {
  try {
    const API_URL = `http://localhost:8080/api/fixture/${id}`;
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
