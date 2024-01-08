"use client";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <p>{params.id}</p>
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