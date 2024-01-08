"use client";
import React, { useState } from "react";

const AddLeague = ({ getLeague }: { getLeague: () => Promise<void> }) => {
  const [leagueName, setLeagueName] = useState<string>("");

  const onSubmitHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const payload = {
      name: leagueName,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/league`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Handle non-OK responses here
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();
      getLeague();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <h5 className="flex items-center justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Add a new league
        </h5>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-6">
            <label
              htmlFor="team_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              League Name
            </label>
            <input
              type="text"
              id="team_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setLeagueName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddLeague;
