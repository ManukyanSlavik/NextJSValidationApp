import { createContext, useContext } from "react";
import { tagData, taskData } from "./tasks/data";

type TaskContextData = {
  newTask: (
    userId: string,
    values: taskData,
    selectedTags: tagData[]
  ) => Promise<void>;
  editTask: (values: taskData, selectedTags: tagData[]) => Promise<void>;
  removeTask: (values: taskData, index: number) => Promise<void>,
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