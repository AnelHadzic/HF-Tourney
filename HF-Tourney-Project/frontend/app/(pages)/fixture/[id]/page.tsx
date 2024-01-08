"use client";

import { getFixture } from "@/app/functions/getFixture";
import { updateFixture } from "@/app/functions/updateFixture";
import { updateTeam } from "@/app/functions/updateTeam";
import { FixtureDataType } from "@/app/types/FixtureDataType";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: number } }) => {
  const fixtureId = params.id;

  const [fixtureData, setFixtureData] = useState<FixtureDataType | undefined>(
    undefined
  );

  // HOME
  const [homeScoreData, setHomeScoreData] = useState<number | undefined>(
    undefined
  );
  const [awayScoreData, setAwayScoreData] = useState<number | undefined>(
    undefined
  );

  const router = useRouter();

  const fetchFixture = async () => {
    const fetchedFixtures = await getFixture(fixtureId);
    setFixtureData(fetchedFixtures);
  };

  useEffect(() => {
    fetchFixture();
  }, []);

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await updateTeam(fixtureData?.homeTeam.id, homeScoreData, awayScoreData);
      await updateTeam(fixtureData?.awayTeam.id, awayScoreData, homeScoreData);
    } catch (error) {
      console.log(error);
    }

    try {
      await updateFixture(fixtureId, homeScoreData, awayScoreData, true);
      router.push(`/leagues/${fixtureData?.league.id}/fixture`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center min-h-screen p-4 sm:p-8">
        <button
          type="button"
          onClick={() =>
            router.push(`/leagues/${fixtureData?.league.id}/fixture`)
          }
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Go back
        </button>
        <div className="mb-6"></div>
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <h5 className="flex items-center justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="mr-4">{fixtureData?.homeTeam?.name}</span>

            {fixtureData?.hasPlayed ? (
              <p className="mx-2">
                {fixtureData?.homeScore} - {fixtureData?.awayScore}
              </p>
            ) : (
              <p className="mx-2">vs</p>
            )}

            <span className="ml-4">{fixtureData?.awayTeam?.name}</span>
          </h5>

          <form onSubmit={handleUpdate}>
            <div className="mb-6">
              <label
                htmlFor="homescore"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {fixtureData?.homeTeam?.name}
              </label>
              <input
                type="number"
                id="homescore"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Home score"
                onChange={(e) => setHomeScoreData(Number(e.target.value))}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="awayscore"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {fixtureData?.awayTeam?.name}
              </label>
              <input
                type="number"
                id="awayscore"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Away score"
                onChange={(e) => setAwayScoreData(Number(e.target.value))}
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
          <div className="mb-6"></div>
          {fixtureData?.hasPlayed ? (
            <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Played
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Not yet played
            </span>
          )}
        </div>
      </main>
    </>
  );
};

export default Page;
