"use client";

import React, { useState, useTransition } from "react";
import { createTask } from "../services/taskService";
import { useSession } from "next-auth/react";
import { taskData } from "./task";
import { useTaskContext } from "./taskBoard";

const CreateTask = () => {
  const { setOptimisticTasks, setTasks, tasks } = useTaskContext();
  
  const [isPending, startTransition] = useTransition();
  const [desc, setDesc] = useState("");
  const { data: session } = useSession();

  const onCreate = async () => {
    if (session?.user.id){
      startTransition(() => {
        setOptimisticTasks({id: `${Date.now()}`, description: desc, isCompleted: false});
      });
      
      try {
        const res: taskData = await createTask(session?.user.id, desc);
        setTasks([...tasks, res]);
      }
      catch{
        console.error("Something went wrong.");
      }
    };
  };

  return (
    <div className="flex flex-row">
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        type="text"
        placeholder="Type here"
        className="input flex-1"
      />
      <button onClick={onCreate} className="btn btn-primary flex" type="submit">
        Add Task
      </button>
    </div>
  );
};

export default CreateTask;
