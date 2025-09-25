"use client";

import React, { useState } from "react";
import CreateTaskForm from "./forms/createTaskForm";

const CreateTask = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-4"
        type="checkbox"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
        className="drawer-toggle"
      />
      <div className="drawer-content mx-auto">
        <label
          onChange={() => setIsDrawerOpen(true)}
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-primary mt-5"
        >
          New Task
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <CreateTaskForm setIsDrawerOpen={setIsDrawerOpen} />
      </div>
    </div>
  );
};

export default CreateTask;
