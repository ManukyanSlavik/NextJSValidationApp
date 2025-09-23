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
  return await addTagsToTask(res.id, selectedTags.map(t => t.id));
};

export const updateTaskAction = async (
  taskId: string,
  newDescription: string
) => {
  return await updateTask(taskId, newDescription);
};

export const checkTaskAction = async (taskId: string, isCompleted: boolean) => {
  return await checkTask(taskId, isCompleted);
};

export const deleteTaskAction = async (taskId: string) => {
  return await deleteTask(taskId);
};
