import prisma from "@/prisma/client";

export const getAllTags = async () => {
    return await prisma.tag.findMany();
};

export const getByName = async (name: string) => {
    return await prisma.tag.findUnique({where: {name}});
}

export const getById = async (id: string) => {
    return await prisma.tag.findUnique({where: {id}});
}

export const getTagsByTaskId = async (id: string) => {
  return await prisma.tag.findMany({
    where: { tasks: { some: { id } } }, // explicit M2M
    select: { id: true, name: true },
  });
};

export const createTag = async (name: string) => {
    return await prisma.tag.create({data: {name}});
}

export const updateTag = async (id: string, name: string) => {
    return await prisma.tag.update({where: {id}, data: {name}});
}

export const deleteTag = async (id: string) => {
    return await prisma.tag.delete({where: {id}});
}