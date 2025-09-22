import { useOptimistic, useState, useTransition } from "react";
import { tagData, taskData, taskPayload } from "../tasks/data";
import { createTaskAction } from "../tasks/actions/taskActions";

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
      });
    });

    try {
      const res: taskData = await createTaskAction(
        userId,
        values.name,
        values.description
      );
      setTasks([...tasks, res]);
    } catch {
      startTransition(() => {
        setOptimisticTasks({
          type: "rollback",
          data: t,
        });
      });
    }
  };

  return { optimisticTasks, newTask, isPending: isTaskPending };
};
