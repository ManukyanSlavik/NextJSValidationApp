"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { checkTask, deleteTask, updateTask } from "../../services/taskService";
import { useRouter } from "next/navigation";
import { useTaskContext } from "./taskBoard";
import { taskData } from "./data";

const Task = () => {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const { tasks } = useTaskContext();

  const startEditing = (task: taskData) => {
    setEditingId(task.id);
    setEditValue(task.description);
  };

  const saveEdit = async (taskId: string) => {
    await updateTask(taskId, editValue);
    setEditingId(null);

    router.refresh();
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    router.refresh();
  };

  const handleCheck = async (taskId: string, isCompleted: boolean) => {
    await checkTask(taskId, isCompleted);
    router.refresh();
  };

  return (
    <ul className="w-2/3">
      {tasks.map((t) => (
        <li
          key={t.id}
          className="flex flex-row items-center justify-between px-3 py-3"
        >
          <div className="flex-1 flex-row">
            <input
              type="checkbox"
              className="checkbox ml-4"
              checked={t.isCompleted}
              onChange={(e) => handleCheck(t.id, e.target.checked)}
            />
            {editingId === t.id ? (
              <input
                className="input input-sm flex-1"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => saveEdit(t.id)}
                autoFocus
              />
            ) : (
              <span
                className={`ml-4 ${
                  t.isCompleted ? "line-through text-gray-400" : ""
                }`}
              >
                {t.description}
              </span>
            )}
          </div>

          <div className="flex">
            <button
              className="rounded-lg border px-3 py-1.5 cursor-pointer"
              onClick={() =>
                editingId === t.id ? saveEdit(t.id) : startEditing(t)
              }
            >
              <PencilSquareIcon className="h-4 w-4" />
            </button>
            <button
              className="rounded-lg bg-rose-600 px-3 py-1.5 mx-3 cursor-pointer"
              onClick={() => handleDelete(t.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Task;
