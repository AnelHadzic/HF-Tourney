import { Team } from "./TeamType";

export type FixtureDataType = {
  id: number;
  league: { id: number; name: string };
  league_id: null;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  hasPlayed: boolean;
};
