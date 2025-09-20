import {
  checkTask,
  createTask,
  deleteTask,
  updateTask,
} from "@/app/services/taskService";

export const createTaskAction = async (userId: string, name: string, description: string) => {
  return await createTask(userId, name, description);
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
