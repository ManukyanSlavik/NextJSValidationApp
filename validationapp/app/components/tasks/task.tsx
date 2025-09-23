"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useTaskContext } from "./taskBoard";

const Task = () => {
  const { tasks } = useTaskContext();

  return (
    <div className="mx-auto w-400 mt-10 overflow-x-auto rounded-box border border-gray-700">
      <table className="table">
        <thead>
          <tr className="divide-x divide-gray-700">
            <th className="w-auto"></th>
            <th className="w-auto">Name</th>
            <th className="w-auto">Description</th>
            <th className="w-auto">Tags</th>
            <th className="w-auto">Edit</th>
            <th className="w-auto">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="divide-x divide-gray-700">
              <td>
                <input
                  type="checkbox"
                  // checked={t.isCompleted}
                  className="checkbox checkbox-primary"
                />
              </td>
              <td>{t.name}</td>
              <td>{t.description}</td>
              <td className="">
                {t.tags?.map((i) => (
                  <div key={i.id} className="bg-gray-800 rounded-xl px-3 py-3">
                    {i.name}
                  </div>
                ))}
              </td>
              <td>
                <button type="button" className="btn bg-amber-50">
                  <PencilSquareIcon className="text-rose-500 w-4 h-4" />
                </button>
              </td>
              <td>
                <button type="button" className="btn bg-rose-500">
                  <TrashIcon className="text-amber-50 w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
