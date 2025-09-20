"use client";

import React, { useContext, useOptimistic, useState } from "react";
import AuthProvider from "../../api/auth/AuthProvider";
import CreateTask from "./createTask";
import Task from "./task";
import { createContext } from "react";
import { tagData, tagPayload, taskData, taskPayload } from "./data";

type TaskContextData = {
  setOptimisticTasks: (action: taskPayload) => void;
  setTasks: (tasks: taskData[]) => void;
  tasks: taskData[];

  setOptimisticTags: (action: tagPayload) => void;
  setTags: (tags: tagData[]) => void;
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
  const [tasks, setTasks] = useState(initialTasks);
  const [tags, setTags] = useState(initialTags);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (current, operation: taskPayload) => {
      if (operation.type === "create") return [...current, operation.data];
      if (operation.type === "update")
        return current.map((t) =>
          t.id === operation.data.id ? operation.data : t
        );
      if (operation.type === "delete")
        return current.filter((t) => t.id !== operation.data.id);

      throw new Error("Invalid operation");
    }
  );
  const [optimisticTags, setOptimisticTags] = useOptimistic(
    tags,
    (current, operation: tagPayload) => {
      if (operation.type === "create") return [...current, operation.data];
      if (operation.type === "update")
        return current.map((t) =>
          t.id === operation.data.id ? operation.data : t
        );
      if (operation.type === "delete")
        return current.filter((t) => t.id !== operation.data.id);

      throw new Error("Invalid operation");
    }
  );

  return (
    <div className="grid place-items-center pt-4">
      <TaskContext.Provider
        value={{
          setOptimisticTasks,
          setTasks,
          tasks: optimisticTasks,
          setOptimisticTags,
          setTags,
          tags: optimisticTags,
        }}
      >
        <AuthProvider>
          <CreateTask />
        </AuthProvider>
        <hr />
        {tasks.length === 0 && <p className="mt-5">No tasks!</p>}
        {tasks.length !== 0 && <Task />}
      </TaskContext.Provider>
    </div>
  );
};

export default TaskBoard;
