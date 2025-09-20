"use client"

import React, { useContext, useOptimistic, useState } from 'react'
import AuthProvider from '../api/auth/AuthProvider';
import CreateTask from './createTask';
import Task, { taskData } from './task';
import { createContext } from 'react';

type TaskContextData = {
  setOptimisticTasks: (action: taskData) => void,
  setTasks: (tasks: taskData[]) => void,
  tasks: taskData[],
};

export const TaskContext = createContext<TaskContextData | null>(null);

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("CreateTask must be used within a TaskContext.Provider");
  return ctx;
}

const TaskBoard = ({tasks: initial}: {tasks: taskData[]}) => {
  const [tasks, setTasks] = useState(initial);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks, (tasks, newTask: taskData) => [...tasks, newTask]);

  return(
    <div className="grid place-items-center pt-4">
      <TaskContext.Provider value={{setOptimisticTasks, setTasks, tasks: optimisticTasks}}>
        <AuthProvider>
          <CreateTask />
        </AuthProvider>
        <hr />
        {tasks.length === 0 && <p className="mt-5">No tasks!</p>}
        {tasks.length !== 0 && <Task />}
        </TaskContext.Provider>
    </div>
  );
}

export default TaskBoard