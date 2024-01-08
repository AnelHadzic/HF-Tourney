"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LeagueCard from "./components/LeagueCard";
import { LeagueType } from "./types/LeagueType";

export default function Home() {
  const [leagues, setLeagues] = useState<[]>([]);

  useEffect(() => {
    const getLeague = async () => {
      try {
        const API_URL = "http://localhost:8080/api/league";
        const response = await axios.get(API_URL);
        console.log(response.data);
        setLeagues(response.data);
      } catch (error) {}
    };
    getLeague();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {leagues.length > 0 &&
        leagues.map((item: LeagueType) => (
          <LeagueCard key={item.id} id={item.id} title={item.name} />
        ))}
    </main>
  );
}
