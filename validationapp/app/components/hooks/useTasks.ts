import { useOptimistic, useState, useTransition } from "react";
import { tagData, taskData, taskPayload } from "../tasks/data";
import {
  createTaskAction,
  deleteTaskAction,
} from "../tasks/actions/taskActions";
import { updateTask } from "@/app/services/taskService";

export const useTasks = (initial: taskData[]) => {
  const [tasks, setTasks] = useState<taskData[]>(initial);
  const [isTaskPending, startTransition] = useTransition();

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
      if (operation.type === "rollback")
        return current.filter((t) => t.id !== operation.data.id);
      if (operation.type === "rollback-update")
        return current.map((t) =>
          t.id === operation.data.id ? operation.data : t
        );
      if (operation.type === "rollback-delete") {
        return [
          ...current.slice(0, operation.index),
          operation.data,
          ...current.slice(operation.index),
        ];
      }

      throw new Error("Invalid operation");
    }
  );

  const newTask = async (
    userId: string,
    values: taskData,
    selectedTags: tagData[]
  ) => {
    const t = {
      id: `${Date.now()}`,
      name: values.name,
      description: values.description,
      isCompleted: false,
      tags: selectedTags,
    };

    startTransition(() => {
      setOptimisticTasks({
        type: "create",
        data: t,
        index: -1,
      });
    });

    try {
      const res: taskData = await createTaskAction(
        userId,
        values.name,
        values.description,
        selectedTags
      );

      setTasks([...tasks, res]);
    } catch {
      startTransition(() => {
        setOptimisticTasks({
          type: "rollback",
          data: t,
          index: -1,
        });
      });
    }
  };

  const editTask = async (values: taskData, selectedTags: tagData[]) => {
    startTransition(() => {
      setOptimisticTasks({
        type: "update",
        data: values,
        index: -1,
      });
    });

    try {
      const res = await updateTask(
        values,
        selectedTags.map((t) => t.id)
      );
      setTasks((curr) => curr.map((t) => (t.id === res.id ? res : t)));
    } catch {
      startTransition(() => {
        setOptimisticTasks({
          type: "rollback-update",
          data: values,
          index: -1,
        });
      });
    }
  };

  const removeTask = async (values: taskData, index: number) => {
    startTransition(() => {
      setOptimisticTasks({
        type: "delete",
        data: values,
        index,
      });
    });

    try {
      const res = await deleteTaskAction(values.id);
      setTasks((curr) => curr.filter((task) => task.id !== res.id));
    } catch {
      startTransition(() => {
        setOptimisticTasks({
          type: "rollback-delete",
          data: values,
          index,
        });
      });
    }
  };

  return {
    optimisticTasks,
    newTask,
    editTask,
    removeTask,
    isPending: isTaskPending,
  };
};
