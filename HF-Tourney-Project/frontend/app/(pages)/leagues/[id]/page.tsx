"use client";
import AddTeam from "@/app/components/AddTeam";
import TeamTable from "@/app/components/TeamTable";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: number } }) {
  const leagueId = params.id;
  const router = useRouter();
  return (
    <main className="flex flex-col items-center min-h-screen p-4 sm:p-8">
      <button
        type="button"
        onClick={() => router.push(`${leagueId}/fixture`)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Fixtures
      </button>
      <div className="mb-6"></div>

      <TeamTable id={leagueId} />
      <div className="mb-6"></div>
      <AddTeam id={leagueId} />
      <div className="mb-6"></div>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Go back
      </button>
    </main>
  );
}
