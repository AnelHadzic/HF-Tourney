import axios from "axios";

export const updateFixture = async (
  id: number,
  homeScore: number,
  awayScore: number,
  hasPlayed: boolean
) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/fixture/${id}`,
      {
        id,
        homeScore,
        awayScore,
        hasPlayed,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
