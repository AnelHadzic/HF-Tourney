"use client";
import React, { useEffect, useState } from "react";
import { getLeagueTeams } from "../functions/getLeagueTeams";
import { Team } from "../types/TeamType";

const CreateFixtures = ({ id }: { id: number }) => {
  const leagueId = id;
  const [teams, setTeams] = useState<Team[]>([]);
  const [fixtureType, setFixtureType] = useState<string>("Once");

  const fetchTeams = async () => {
    const fetchedTeams = await getLeagueTeams(leagueId);
    setTeams(fetchedTeams);
  };

  useEffect(() => {
    fetchTeams();
  }, [leagueId]);

  const createFixtures = async () => {
    let matchups = [];
    try {
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matchups.push({
            league_id: leagueId,
            homeTeam: { name: teams[i].name, id: teams[i].id },
            awayTeam: { name: teams[j].name, id: teams[j].id },
            homeScore: null,
            awayScore: null,
            hasPlayed: false,
          });

          if (fixtureType === "Twice") {
            matchups.push({
              league_id: leagueId,
              homeTeam: { name: teams[j].name, id: teams[j].id },
              awayTeam: { name: teams[i].name, id: teams[i].id },
              homeScore: null,
              awayScore: null,
              hasPlayed: false,
            });
          }
        }
      }

      for (const fixture of matchups) {
        await fetch(`http://localhost:8080/api/fixture`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(fixture),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        How many times should the teams meet eachother?
      </label>
      <select
        id="countries"
        onChange={(e) => {
          setFixtureType(e.currentTarget.value);
        }}
        className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="Once">Once</option>
        <option value="Twice">Twice</option>
      </select>

      <p>{fixtureType}</p>
      <button
        onClick={() => createFixtures()}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Fixture
      </button>
    </>
  );
};

export default CreateFixtures;
