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
  editTask: (values: taskData, selectedTags: tagData[]) => Promise<void>;
  tasks: taskData[];
};

type TagContextData = {
  newTag: (name: string) => Promise<void>;
  newTagAndAttach: (name: string, taskId: string) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  tags: tagData[];
};

export const TaskContext = createContext<TaskContextData | null>(null);
export const TagContext = createContext<TagContextData | null>(null);

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx)
    throw new Error("CreateTask must be used within a TaskContext.Provider");
  return ctx;
};

export const useTagContext = () => {
  const ctx = useContext(TagContext);
  if (!ctx)
    throw new Error("CreateTask must be used within a TaskContext.Provider");
  return ctx;
};

interface Props {
  tasks: taskData[];
  tags: tagData[];
}

const TaskBoard = ({ tasks: initialTasks, tags: initialTags }: Props) => {
  const { optimisticTasks, newTask, editTask } = useTasks(initialTasks);
  const { optimisticTags, newTag, newTagAndAttach, deleteTag } =
    useTags(initialTags);

  return (
    <div className="grid place-items-center pt-4">
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
          <AuthProvider>
            <CreateTask />
            <Task />
          </AuthProvider>
        </TagContext.Provider>
      </TaskContext.Provider>
    </div>
  );
};

export default TaskBoard;
