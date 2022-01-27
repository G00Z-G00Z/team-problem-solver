import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Help = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-2 max-w-lg mx-auto ">
      <h1 className="text-gray-900 dark:text-gray-200 text-3xl font-serif text-center mb-2 ">
        What is this app ?
      </h1>
      <p className="text-gray-800">
        This app has the purpose of{" "}
        <strong className="text-CTA-500 ">solving problems</strong> that could
        happend amongs teams. For example:
      </p>

      <ul className="flex flex-col gap-4">
        <li className="bg-CTA-100 text-CTA-500 p-4 rounded-md shadow-md hover:shadow-lg transition-all">
          Whenever you are in a board game, and you must decide{" "}
          <strong>which one goes first.</strong>
        </li>
        <li className="bg-gray-200 p-4 rounded-md shadow-md hover:shadow-lg transition-all">
          When you are dividing tasks for a team project, you can{" "}
          <strong>divide the tasks randomly</strong>, acording to ther weight in
          workload
        </li>
        <li className="bg-CTA-100 text-CTA-500 p-4 rounded-md shadow-md hover:shadow-lg transition-all">
          When you are deciding <strong>who's gonna go first</strong>.{" "}
        </li>
        <li className="bg-gray-200 p-4 rounded-md shadow-md hover:shadow-lg transition-all">
          When you try to decide something, you can{" "}
          <strong>choose a person randomly</strong>
        </li>
      </ul>

      <button
        className="mt-4 bg-CTA-400 text-gray-100  h-8 px-3 text-xl rounded-md disabled:opacity-75 hover:bg-CTA-500 transition-all"
        onClick={handleClick}
      >
        Go solve my problem!!
      </button>
    </div>
  );
};
