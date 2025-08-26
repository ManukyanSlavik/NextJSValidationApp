"use client";

import React, { useState } from "react";
import { createTask } from "../services/taskService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateTask = () => {
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const { data: session } = useSession();

  const onCreate = async () => {
    if (session?.user.id) await createTask(session?.user.id, desc);
    router.refresh();
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
