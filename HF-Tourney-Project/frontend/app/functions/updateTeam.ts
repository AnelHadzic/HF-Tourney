import axios from "axios";
import { getTeamData } from "./getTeam";
import { Team } from "../types/TeamType";

export const updateTeam = async (
  id: number,
  fixtureGf: number,
  fixtureGa: number
) => {
  // CURRENT TEAM DATA
  const teamData: Team = await getTeamData(id);

  // FROM FIXTURE
  let fixturePts = 0;
  let fixtureGd = fixtureGf - fixtureGa;
  let fixtureW = 0;
  let fixtureD = 0;
  let fixtureL = 0;

  if (fixtureGf > fixtureGa) {
    fixturePts = 3;
    fixtureW = 1;
  } else if (fixtureGf === fixtureGa) {
    fixturePts = 1;
    fixtureD = 1;
  } else {
    fixtureL = 1;
  }

  // SUM UP TOTAL POINTS
  const p = teamData.w + teamData.d + teamData.l + 1;
  const w = teamData.w + fixtureW;
  const d = teamData.d + fixtureD;
  const l = teamData.l + fixtureL;
  const gf = teamData.gf + fixtureGf;
  const ga = teamData.ga + fixtureGa;
  const gd = teamData.gd + fixtureGd;
  const pts = teamData.pts + fixturePts;

  const payload = {
    id,
    p,
    w,
    d,
    l,
    gf,
    ga,
    gd,
    pts,
  };

  try {
    const response = await axios.patch(
      `http://localhost:8080/api/team/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
