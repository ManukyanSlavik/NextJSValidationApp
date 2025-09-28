"use client";

import React, { useState } from "react";
import AuthProvider from "../../api/auth/AuthProvider";
import Task from "./task";
import { tagData, taskData } from "./data";
import { useTasks } from "../hooks/useTasks";
import { useTags } from "../hooks/useTags";
import { TaskContext, TagContext } from "../context";
import CreateTaskForm from "./forms/createTaskForm";
import UpdateTaskForm from "./forms/updateTaskForm";

type drawerState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; data: taskData };

interface Props {
  tasks: taskData[];
  tags: tagData[];
}

const TaskBoard = ({ tasks: initialTasks, tags: initialTags }: Props) => {
  const { optimisticTasks, newTask, editTask } = useTasks(initialTasks);
  const { optimisticTags, newTag, newTagAndAttach, deleteTag } =
    useTags(initialTags);

  const [drawer, setDrawer] = useState<drawerState>({ type: "closed" });

  const onEdit = (data: taskData) => {
    setDrawer({ type: "edit", data });
  };
  const closeDrawer = () => {
    setDrawer({ type: "closed" });
  };

  return (
    <TaskContext.Provider
      value={{
        newTask,
        editTask,
        tasks: optimisticTasks,
      }}
    >
      <TagContext.Provider
        value={{
          newTag,
          deleteTag,
          newTagAndAttach,
          tags: optimisticTags,
        }}
      >
        <div className="grid place-items-center pt-4">
          <div className="drawer drawer-end">
            <input
              type="checkbox"
              id="drawer"
              className="drawer-toggle"
              checked={drawer.type !== "closed"}
              onChange={(e) => {
                if (!e.target.checked) {
                  setDrawer({ type: "closed" });
                }
              }}
            />

            <div className="drawer-content">
              <AuthProvider>
                <button
                  onClick={() => setDrawer({ type: "create" })}
                  className="btn btn-primary mx-auto block"
                >
                  New Task
                </button>

                <Task onEdit={onEdit} />
              </AuthProvider>
            </div>

            <div className="drawer-side">
              <div
                className="drawer-overlay"
                aria-label="close sidebar"
                onClick={() => setDrawer({ type: "closed" })}
              />
              <AuthProvider>
                {drawer.type === "create" && (
                  <CreateTaskForm closeDrawer={closeDrawer} />
                )}
                {drawer.type === "edit" && (
                  <UpdateTaskForm
                    task={drawer.data}
                    closeDrawer={closeDrawer}
                  />
                )}
              </AuthProvider>
            </div>
          </div>
        </div>
      </TagContext.Provider>
    </TaskContext.Provider>
  );
};

export default TaskBoard;
