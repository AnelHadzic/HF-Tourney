export type FixtureType = {
  id: number;
  league_id: number;
  homeTeam: { name: string; id: number };
  awayTeam: { name: string; id: number };
  homeScore: number;
  awayScore: number;
  hasPlayed: boolean;
};
