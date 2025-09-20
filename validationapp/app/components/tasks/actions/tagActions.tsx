import { createTag, deleteTag, updateTag } from "@/app/services/tagService";

export const createTagAction = async (name: string) => {
  return await createTag(name);
};

export const updateTagAction = async (id: string, name: string) => {
  return await updateTag(id, name);
};

export const deleteTagAction = async (id: string) => {
  return await deleteTag(id);
};
