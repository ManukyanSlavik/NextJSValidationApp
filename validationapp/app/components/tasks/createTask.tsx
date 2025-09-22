"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { useTaskContext } from "./taskBoard";
import { useForm } from "react-hook-form";
import { tagData, taskData } from "./data";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateTask = () => {
  const { newTask, newTag, tags, deleteTag } = useTaskContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<taskData>({ mode: "onChange" });
  const [selectedTags, setSelectedTags] = useState<tagData[]>([]);
  const [newTagField, setNewTagField] = useState("");
  const [tagErrors, setTagErrors] = useState<string>("");

  const { data: session } = useSession();

  const handleNewTag = async () => {
    if (session?.user.id) {
      setTagErrors("");

      if (newTagField.trim() === "") {
        setTagErrors("Tag name cannot be empty");
        return;
      }
      if (tags.some((t) => t.name === newTagField)) {
        setTagErrors("Tag already exists");
        return;
      }

      await newTag(newTagField);

      setNewTagField("");
    }
  };

  const handleTagDelete = async (id: string) => {
    if (session?.user.id) await deleteTag(id);
  };

  const handleNewTask = async (values: taskData) => {
    if (session?.user.id) await newTask(session?.user.id, values, selectedTags);
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
        <form className="menu bg-base-200 text-base-content min-h-full w-180 p-4">
          {/* Sidebar content here */}
          <h1 className="text-3xl mb-10 mx-auto">Create a new Task</h1>

          {errors.name && (
            <p className="text-error mx-auto my-5 w-150">
              {errors.name?.message}
            </p>
          )}

          <div className="form-control mx-auto mb-10 w-150">
            <input
              {...register("name", { required: "This field is required" })}
              type="text"
              placeholder="Task name"
              className="input input-bordered w-full"
            />
          </div>

          {errors.description && (
            <p className="text-error mx-auto my-5 w-150">
              {errors.description?.message}
            </p>
          )}

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
            <h1 className="text-xl mb-5">Tags</h1>

            {tagErrors !== "" && (
              <div className="mx-auto mb-5 w-150">
                <p className="text-error text-sm">{tagErrors}</p>
              </div>
            )}

            <div className="flex mb-5">
              <input
                onChange={(e) => setNewTagField(e.target.value)}
                value={newTagField}
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
            <div className="flex flex-wrap gap-2">
              {tags.length === 0 && (
                <p className="mx-auto text-gray-400">Add some tags!</p>
              )}
              {tags.map((t) => (
                <label
                  className="label mx-2 flex justify-between bg-gray-800 rounded-4xl px-3 py-3"
                  key={t.id}
                >
                  <div>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mr-2"
                      onChange={(e) => {
                        if (e.target.checked)
                          setSelectedTags([...tags, t as tagData]);
                        else
                          setSelectedTags(
                            tags.filter((tag) => tag.id !== t.id)
                          );
                      }}
                    />
                    {t.name}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="bg-transparent px-2 py-1.5 ml-4 cursor-pointer"
                      onClick={() => handleTagDelete(t.id)}
                    >
                      <XMarkIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
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
