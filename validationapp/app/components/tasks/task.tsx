"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTaskContext } from "./taskBoard";
import UpdateTaskForm from "./forms/updateTaskForm";
import { taskData } from "./data";

const Task = () => {
  const { tasks } = useTaskContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<taskData | null>(null);

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
                <button
                  type="button"
                  className="drawer-button btn bg-amber-50"
                  onClick={() => {
                    setSelectedTask(t);
                    setIsDrawerOpen(true);
                  }}
                >
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

      <div className="drawer drawer-end">
        <input
          id="editTaskDrawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={(e) => setIsDrawerOpen(e.target.checked)}
        />
        <div className="drawer-content mx-auto" />
        <div className="drawer-side">
          <label
            htmlFor="editTaskDrawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsDrawerOpen(false)}
          />
          {selectedTask && (
            <UpdateTaskForm
              task={selectedTask}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
