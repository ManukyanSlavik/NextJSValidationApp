"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import { taskData } from "./data";
import { useTagContext, useTaskContext } from "../context";

interface Props {
  onEdit: (data: taskData) => void;
}

const Task = ({ onEdit }: Props) => {
  const { tasks, removeTask } = useTaskContext();
  const { tags } = useTagContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="drawer drawer-end">
      <input
        id="editTaskDrawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />

      <div className="drawer-content">
        <div className="mx-auto w-400 mt-10 overflow-x-auto rounded-box border border-neutral">
          <table className="table">
            <thead>
              <tr className="divide-x divide-neutral">
                <th className="w-auto"></th>
                <th className="w-auto text-primary-content">Name</th>
                <th className="w-auto text-primary-content">Description</th>
                <th className="w-auto text-primary-content">Tags</th>
                <th className="w-auto text-primary-content">Edit</th>
                <th className="w-auto text-primary-content">Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t, index) => (
                <tr key={t.id} className="divide-x divide-neutral">
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </td>
                  <td className="text-primary-content">{t.name}</td>
                  <td className="text-primary-content">{t.description}</td>
                  <td className="max-w-28">
                    <div className="flex justify-center flex-wrap gap-2">
                      {tags
                        .filter((tag) =>
                          t.tags?.some((attached) => attached.id === tag.id)
                        )
                        .map((tag) => (
                          <div
                            key={tag.id}
                            className="bg-base-200 rounded-xl px-3 py-1"
                          >
                            {tag.name}
                          </div>
                        ))}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn bg-base-300"
                      onClick={() => {
                        onEdit(t);
                      }}
                    >
                      <PencilSquareIcon className="text-rose-500 w-4 h-4" />
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn bg-rose-500"
                      onClick={() => {
                        removeTask(t, index);
                      }}
                    >
                      <TrashIcon className="text-base-300 w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="editTaskDrawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        ></label>
      </div>
    </div>
  );
};

export default Task;
