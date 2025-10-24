import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { tagData, taskData } from "../data";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useTagContext, useTaskContext } from "../../context";

interface Props {
  closeDrawer: () => void;
}

const CreateTaskForm = ({ closeDrawer }: Props) => {
  const { newTask } = useTaskContext();
  const { newTag, tags, deleteTag } = useTagContext();
  const {
    register,
    handleSubmit,
    reset,
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
    if (session?.user.id) {
      await newTask(session?.user.id, values, selectedTags);

      reset();
      setSelectedTags([]);
      closeDrawer();
    }
  };

  return (
    <form className="menu bg-base-200 text-base-content min-h-full w-180 p-4">
      <h1 className="text-3xl text-primary-content mb-10 mx-auto">
        {" "}
        Create a new task{" "}
      </h1>

      {errors.name && (
        <p className="text-error mx-auto my-5 w-150">{errors.name?.message}</p>
      )}

      <div className="form-control mx-auto mb-10 w-150">
        <input
          {...register("name", { required: "This field is required" })}
          type="text"
          placeholder="Task name"
          className="input input-bordered input-neutral text-base-300 w-full"
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
          className="textarea textarea-neutral text-base-300 w-full"
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
            className="input input-bordered input-neutral text-base-300 w-full mr-1"
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
            <p className="mx-auto text-base-300">Add some tags!</p>
          )}
          {tags.map((t) => (
            <label
              className="label mx-2 flex justify-between bg-base-100 rounded-4xl p-3"
              key={t.id}
            >
              <div>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary mr-2"
                  defaultChecked={false}
                  onChange={(e) => {
                    if (e.target.checked)
                      setSelectedTags((curr) =>
                        curr.some((x) => x.id === t.id) ? curr : [...curr, t]
                      );
                    else
                      setSelectedTags((prev) =>
                        prev.filter((x) => x.id !== t.id)
                      );
                  }}
                />
                <span className="text-primary-content">{t.name}</span>
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
          Add a new task
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
