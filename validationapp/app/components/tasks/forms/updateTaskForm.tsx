import React, { useEffect, useState } from "react";
import { tagData, taskData } from "../data";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTagContext, useTaskContext } from "../../context";

interface Props {
  closeDrawer: () => void;
  task: taskData;
}

const UpdateTaskForm = ({ task, closeDrawer }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<taskData>({ defaultValues: task, mode: "onChange" });
  const { tags, newTagAndAttach, deleteTag } = useTagContext();
  const { editTask } = useTaskContext();
  const { data: session } = useSession();
  const [selectedTags, setSelectedTags] = useState<tagData[]>(task.tags ?? []);
  const [newTagField, setNewTagField] = useState("");
  const [tagErrors, setTagErrors] = useState<string>("");

  useEffect(() => {
    setSelectedTags(task.tags ?? []);
  }, [task]);

  useEffect(() => {
    reset(task);
    setSelectedTags(task.tags ?? []);
  }, [task, reset]);

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

      await newTagAndAttach(newTagField, task.id);
      setNewTagField("");
    }
  };

  const handleTagDelete = async (id: string) => {
    if (session?.user.id) await deleteTag(id);
  };

  const handleTaskUpdate = async (values: taskData) => {
    const filteredTags = selectedTags.filter((t) =>
      tags.some((i) => t.id === i.id)
    );

    if (session?.user.id) {
      await editTask(values, filteredTags);

      reset();
      setSelectedTags([]);
      closeDrawer();
    }
  };

  return (
    <form className="menu bg-base-200 text-base-content min-h-full w-180 p-4">
      <h1 className="text-3xl mb-10 mx-auto"> Edit a task </h1>

      {errors.name && (
        <p className="text-error mx-auto my-5 w-150">{errors.name?.message}</p>
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
          {...register("description", { required: "This field is required" })}
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
              className="label mx-2 flex justify-between bg-gray-800 rounded-4xl p-3"
              key={t.id}
            >
              <div>
                <input
                  checked={selectedTags.some((x) => x.id === t.id)}
                  onChange={(e) => {
                    if (e.target.checked)
                      setSelectedTags((curr) =>
                        curr.some((x) => x.id === t.id) ? curr : [...curr, t]
                      );
                    else
                      setSelectedTags((curr) =>
                        curr.filter((x) => x.id !== t.id)
                      );
                  }}
                  type="checkbox"
                  className="checkbox checkbox-primary mr-2"
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

      <div className="form-control mx-auto w-150 flex justify-between">
        <button
          onClick={handleSubmit(handleTaskUpdate)}
          type="button"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateTaskForm;
