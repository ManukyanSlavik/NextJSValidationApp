import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { taskData, tagData } from "@/app/components/tasks/data";
import TaskBoard from "@/app/components/tasks/taskBoard";
import { getAllTags } from "@/app/services/tagService";
import { getAllTasks } from "@/app/services/taskService";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
  const tasks: taskData[] = await getAllTasks(session?.user.id ?? "");
  const tags: tagData[] = await getAllTags();

  return <TaskBoard tasks={tasks} tags={tags} />;
}