"use server";

import prisma from "@/prisma/client";

export const getAllTasks = async (userId: string) => {
  return await prisma.task.findMany({ where: { userId } });
};

export const createTask = async (
  userId: string,
  name: string,
  description: string
) => {
  return await prisma.task.create({
    data: {
      userId,
      name,
      description,
      isCompleted: false,
    },
  });
};

export const addTagsToTask = async (taskId: string, tagIds: string[]) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: {
      tags: { connect: tagIds.map((id) => ({ id })) },
    },
    include: {
      tags: true,
    },
  });
};

export async function createTagAndAttach(taskId: string, name: string) {
  return prisma.task.update({
    where: { id: taskId },
    data: {
      tags: {
        connectOrCreate: { where: { name }, create: { name } },
      },
    },
    include: { tags: true },
  });
}

export const updateTask = async (id: string, description: string) => {
  return await prisma.task.update({
    where: { id },
    data: {
      description,
    },
  });
};

export async function removeTagFromTask(taskId: string, tagId: string) {
  return prisma.task.update({
    where: { id: taskId },
    data: { tags: { disconnect: { id: tagId } } },
    include: { tags: true },
  });
}

export const checkTask = async (id: string, isCompleted: boolean) => {
  return await prisma.task.update({
    where: { id },
    data: {
      isCompleted,
    },
  });
};

export const deleteTask = async (id: string) => {
  await prisma.task.delete({
    where: { id },
  });
};
