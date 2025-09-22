"use client";

import React, { useContext } from "react";
import AuthProvider from "../../api/auth/AuthProvider";
import CreateTask from "./createTask";
import Task from "./task";
import { createContext } from "react";
import { tagData, taskData } from "./data";
import { useTasks } from "../hooks/useTasks";
import { useTags } from "../hooks/useTags";

type TaskContextData = {
  newTask: (
    userId: string,
    values: taskData,
    selectedTags: tagData[]
  ) => Promise<void>;
  tasks: taskData[];

  newTag: (name: string) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  tags: tagData[];
};

export const TaskContext = createContext<TaskContextData | null>(null);

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx)
    throw new Error("CreateTask must be used within a TaskContext.Provider");
  return ctx;
};

interface Props {
  tasks: taskData[];
  tags: tagData[];
}

const TaskBoard = ({ tasks: initialTasks, tags: initialTags }: Props) => {
  const { optimisticTasks, newTask } = useTasks(initialTasks);
  const { optimisticTags, newTag, deleteTag } = useTags(initialTags);

  return (
    <div className="grid place-items-center pt-4">
      <TaskContext.Provider
        value={{
          newTask,
          tasks: optimisticTasks,
          newTag,
          tags: optimisticTags,
          deleteTag,
        }}
      >
        <AuthProvider>
          <CreateTask />
        </AuthProvider>
        <hr />
        {optimisticTasks.length === 0 && <p className="mt-5">No tasks!</p>}
        {optimisticTasks.length !== 0 && <Task />}
      </TaskContext.Provider>
    </div>
  );
};

export default TaskBoard;
