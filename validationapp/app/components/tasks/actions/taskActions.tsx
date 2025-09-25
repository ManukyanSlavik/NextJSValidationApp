import {
  addTagsToTask,
  checkTask,
  createTask,
  deleteTask,
  updateTask,
} from "@/app/services/taskService";
import { tagData, taskData } from "../data";

export const createTaskAction = async (
  userId: string,
  name: string,
  description: string,
  selectedTags: tagData[]
) => {
  const res: taskData = await createTask(userId, name, description);
  return await addTagsToTask(
    res.id,
    selectedTags.map((t) => t.id)
  );
};

export const attachTagAction = async (taskId: string, tagId: string) => {
  return await addTagsToTask(taskId, [tagId]);
};

export const updateTaskAction = async (
  values: taskData,
  selectedTags: tagData[]
) => {
  return await updateTask(
    values,
    selectedTags.map((t) => t.id)
  );
};

export const checkTaskAction = async (taskId: string, isCompleted: boolean) => {
  return await checkTask(taskId, isCompleted);
};

export const deleteTaskAction = async (taskId: string) => {
  return await deleteTask(taskId);
};
