import { useOptimistic, useState, useTransition } from "react";
import { tagData, tagPayload } from "../tasks/data";
import { createTagAction, deleteTagAction } from "../tasks/actions/tagActions";
import { attachTagAction } from "../tasks/actions/taskActions";

export const useTags = (initial: tagData[]) => {
  const [tags, setTags] = useState(initial);
  const [isTagPending, startTransition] = useTransition();

  const [optimisticTags, setOptimisticTags] = useOptimistic(
    tags,
    (current, operation: tagPayload) => {
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

  const newTag = async (name: string) => {
    const t = {
      id: `${Date.now()}`,
      name,
    };

    startTransition(() => {
      setOptimisticTags({
        type: "create",
        data: t,
      });
    });

    try {
      const res: tagData = await createTagAction(name);

      setTags([...tags, res]);
    } catch {
      startTransition(() => {
        setOptimisticTags({
          type: "rollback",
          data: t,
        });
      });
    }
  };

  const newTagAndAttach = async (name: string, taskId: string) => {
    const t = {
      id: `${Date.now()}`,
      name,
    };

    startTransition(() => {
      setOptimisticTags({
        type: "create",
        data: t,
      });
    });

    try {
      const res: tagData = await createTagAction(name);
      setTags([...tags, res]);

      await attachTagAction(name, taskId);
    } catch {
      startTransition(() => {
        setOptimisticTags({
          type: "rollback",
          data: t,
        });
      });
    }
  };

  const deleteTag = async (id: string) => {
    startTransition(() => {
      setOptimisticTags({
        type: "delete",
        data: {
          id,
          name: "dud",
        },
      });
    });

    try {
      await deleteTagAction(id);
      setTags(tags.filter((t) => t.id !== id));
    } catch {}
  };

  return { optimisticTags, newTag, deleteTag, newTagAndAttach, isPending: isTagPending };
};
