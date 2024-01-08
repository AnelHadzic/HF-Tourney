"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LeagueCard from "./components/LeagueCard";
import { LeagueType } from "./types/LeagueType";
import AddLeague from "./components/AddLeague";

export default function Home() {
  const [leagues, setLeagues] = useState<[]>([]);

  const [toggle, setToggle] = useState<boolean>(false);

  const getLeague = async () => {
    try {
      const API_URL = "http://localhost:8080/api/league";
      const response = await axios.get(API_URL);
      setLeagues(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getLeague();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {leagues.length > 0 &&
        leagues.map((item: LeagueType) => (
          <LeagueCard key={item.id} id={item.id} title={item.name} />
        ))}
      <div className="mt-6">
        {toggle ? (
          <AddLeague getLeague={getLeague} />
        ) : (
          <button
            type="button"
            onClick={() => {
              setToggle(!toggle);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add new league
          </button>
        )}
      </div>
    </main>
  );
}
