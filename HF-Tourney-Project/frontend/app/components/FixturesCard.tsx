"use client";
import React, { useState, Fragment, useEffect } from "react";
import { FixtureType } from "../types/FixtureType";
import { getLeagueFixtures } from "../functions/getLeagueFixtures";
import CreateFixtures from "./CreateFixtures";
import { useRouter } from "next/navigation";

const FixturesCard = ({ id }: { id: number }) => {
  const leagueId = id;
  const router = useRouter();

  const [fixtures, setFixtures] = useState<FixtureType[]>([]);

  const fetchFixtures = async () => {
    const fetchedFixtures = await getLeagueFixtures(leagueId);
    setFixtures(fetchedFixtures);
  };

  useEffect(() => {
    fetchFixtures();
  }, [leagueId]);

  return (
    <>
      {fixtures.length === 0 && (
        <div className="mb-6">
          <CreateFixtures id={leagueId} />
        </div>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Home Team
              </th>
              <th scope="col" className="px-6 py-3">
                Away Team
              </th>
              <th scope="col" className="px-6 py-3">
                Home Score
              </th>
              <th scope="col" className="px-6 py-3">
                Away Score
              </th>
              <th scope="col" className="px-6 py-3">
                Played
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {fixtures.map((item: FixtureType) => (
              <Fragment key={item.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{item.homeTeam.name}</td>
                  <td className="px-6 py-4">{item.awayTeam.name}</td>
                  <td className="px-6 py-4">{item.homeScore}</td>
                  <td className="px-6 py-4">{item.awayScore}</td>
                  <td className="px-6 py-4">
                    {item.hasPlayed ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="green"
                          d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="red"
                          d="M2.1 3.51a.996.996 0 0 0 0 1.41l7.19 7.19c.18.2.18.5-.01.7a.485.485 0 0 1-.7 0L6.87 11.1c-.11.4-.26.78-.45 1.12l1.4 1.4c.2.2.2.51 0 .71a.485.485 0 0 1-.7 0l-1.27-1.27c-.24.29-.5.56-.77.8l1.28 1.28c.2.2.2.51 0 .71c-.1.1-.23.15-.36.15s-.26-.05-.35-.15l-1.38-1.38c-.71.47-1.43.81-2.02 1.04A1.99 1.99 0 0 0 1 17.37V18c0 1.1.9 2 2 2h6.67c.53 0 1.04-.21 1.41-.59l2.74-2.74l5.23 5.23a.996.996 0 1 0 1.41-1.41L3.51 3.51a.996.996 0 0 0-1.41 0zm16.41 12.17l-1.41-1.41l4.48-4.48c.78.78.78 2.05 0 2.83l-3.07 3.06zm2.37-6.6l-4.48 4.48l-7.1-7.09l3.09-3.07a2 2 0 0 1 2.82 0l5.67 5.68z"
                        />
                      </svg>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => router.push(`/fixture/${item.id}`)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98Zm-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FixturesCard;
