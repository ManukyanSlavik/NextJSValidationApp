import prisma from "@/prisma/client";

export const getAllTasks = async (userId: string) => {
  return await prisma.task.findMany({ where: { userId } });
};

export const createTask = async (userId: string, description: string) => {
  await prisma.task.create({
    data: {
      userId,
      description,
      isCompleted: false,
    },
  });
};

export const updateTask = async (
  taskId: string,
  newDesc: string,
  isCompleted: boolean
) => {
  await prisma.task.update({
    where: { id: taskId },
    data: {
      description: newDesc,
      isCompleted,
    },
  });
};

export const deleteTask = async (taskId: string) => {
  await prisma.task.delete({
    where: { id: taskId },
  });
};
