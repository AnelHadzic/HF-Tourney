import React, { useState } from "react";
import { useRouter } from "next/navigation";

type addTeamProps = {
  id: number;
};

const AddTeam = (props: addTeamProps) => {
  const { id } = props;
  const [teamName, setTeamName] = useState<string>("");
  const [teamImage, setTeamImage] = useState<string>("");
  const router = useRouter();

  const onSubmitHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const payload = {
      name: teamName,
      image: teamImage,
      league_id: id,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/team`, {
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
      router.push(`/leagues/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <h5 className="flex items-center justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Add a team
          </h5>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-6">
              <label
                htmlFor="team_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Team Name
              </label>
              <input
                type="text"
                id="team_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="team_image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Team Image URL
              </label>
              <input
                type="text"
                id="team_image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setTeamImage(e.target.value)}
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
      </main>
    </>
  );
};

export default AddTeam;
