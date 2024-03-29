import React from "react";

type cardProps = {
  id: number;
  title: string;
};
const LeagueCard = (props: cardProps) => {
  const { id, title } = props;

  return (
    <a
      href={`/leagues/${id}`}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
    </a>
  );
};

export default LeagueCard;
