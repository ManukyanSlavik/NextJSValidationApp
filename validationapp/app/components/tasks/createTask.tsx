"use client";

import React, { useState, useTransition } from "react";
import { useSession } from "next-auth/react";

import { useTaskContext } from "./taskBoard";
import { useForm } from "react-hook-form";
import { tagData, taskData } from "./data";
import { createTagAction } from "./actions/tagActions";
import { createTaskAction } from "./actions/taskActions";

const CreateTask = () => {
  const {
    setOptimisticTasks,
    setTasks,
    tasks,
    setOptimisticTags,
    setTags,
    tags,
  } = useTaskContext();
  const { register, handleSubmit } = useForm<taskData>({ mode: "onChange" });
  const [selectedTags, setSelectedTags] = useState<tagData[]>([]);
  const [newTag, setNewTag] = useState("");

  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  const handleNewTag = async () => {
    if (session?.user.id) {
      const tempId = `${Date.now()}`;
      startTransition(() => {
        setOptimisticTags({
          type: "create",
          data: {
            id: tempId,
            name: newTag,
          },
        });
      });

      try {
        const res: tagData = await createTagAction(newTag);
        setTags([...tags, res]);
      } catch {
        setTags(tags.filter((t) => t.id !== tempId));
      }
    }
  };

  const handleNewTask = async (values: taskData) => {
    if (session?.user.id) {
      const tempId = `${Date.now()}`;
      startTransition(() => {
        setOptimisticTasks({
          type: "create",
          data: {
            id: tempId,
            name: values.name,
            description: values.description,
            isCompleted: false,
            tags: selectedTags,
          },
        });
      });

      try {
        const res: taskData = await createTaskAction(
          session?.user.id,
          values.name,
          values.description
        );
        setTasks([...tasks, res]);
      } catch {}
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mx-auto">
        {/* Page content here */}
        <label
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
        <form className="menu bg-base-200 text-base-content min-h-full w-200 p-4">
          {/* Sidebar content here */}
          <div className="form-control mx-auto mb-10 w-150">
            <input
              {...register("name", { required: "This field is required" })}
              type="text"
              placeholder="Task name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mx-auto mb-10 w-150">
            <textarea
              {...register("description", {
                required: "This field is required",
              })}
              placeholder="Task's description"
              className="textarea w-full"
            ></textarea>
          </div>

          <div className="form-control mx-auto mb-10 w-150">
            <h1>Filters</h1>
            <div className="flex mb-5">
              <input
                onChange={(e) => setNewTag(e.target.value)}
                type="text"
                placeholder="Tag's name"
                className="input input-bordered w-full mr-1"
              />
              <button
                type="button"
                onClick={handleNewTag}
                className="btn btn-primary"
              >
                New tag
              </button>
            </div>
            <div className="flex flex-wrap">
              {tags.map((t) => (
                <label className="label mx-2" key={t.id}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedTags([...tags, t as tagData]);
                      else
                        setSelectedTags(tags.filter((tag) => tag.id !== t.id));
                    }}
                  />
                  {t.name}
                </label>
              ))}
            </div>
          </div>

          <div className="form-control mx-auto w-150">
            <button
              onClick={handleSubmit(handleNewTask)}
              type="button"
              className="btn btn-primary"
            >
              Add new task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
