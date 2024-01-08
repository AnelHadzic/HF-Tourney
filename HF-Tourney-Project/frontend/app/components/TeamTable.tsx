import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { getLeagueTeams } from "../functions/getLeagueTeams";
import { Team } from "../types/TeamType";

type teamTableType = {
  id: number;
};
const TeamTable = (props: teamTableType) => {
  const { id } = props;
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchTeams = async () => {
    const fetchedTeams = await getLeagueTeams(id);
    setTeams(fetchedTeams);
  };

  useEffect(() => {
    fetchTeams();
  }, [id]);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-200 rounded-lg overflow-hidden bg-gray-800">
          <thead className="text-xs text-gray-200 uppercase bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4"></th>
              <th scope="col" className="px-6 py-4">
                Team
              </th>
              <th scope="col" className="px-6 py-4">
                P
              </th>
              <th scope="col" className="px-6 py-4">
                W
              </th>
              <th scope="col" className="px-6 py-4">
                D
              </th>
              <th scope="col" className="px-6 py-4">
                L
              </th>
              <th scope="col" className="px-6 py-4">
                GF
              </th>
              <th scope="col" className="px-6 py-4">
                GA
              </th>
              <th scope="col" className="px-6 py-4">
                GD
              </th>
              <th scope="col" className="px-6 py-4">
                PTS
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((item, index) => (
              <Fragment key={item.id}>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.image}
                      style={{ maxWidth: "40px", maxHeight: "40px" }}
                      alt="Item"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.p}</td>
                  <td className="px-6 py-4">{item.w}</td>
                  <td className="px-6 py-4">{item.d}</td>
                  <td className="px-6 py-4">{item.l}</td>
                  <td className="px-6 py-4">{item.gf}</td>
                  <td className="px-6 py-4">{item.ga}</td>
                  <td className="px-6 py-4">{item.gd}</td>
                  <td className="px-6 py-4">{item.pts}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeamTable;
