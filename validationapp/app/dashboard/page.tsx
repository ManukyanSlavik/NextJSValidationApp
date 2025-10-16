import { getServerSession } from "next-auth";
import { getAllTasks } from "../services/taskService";
import { tagData, taskData } from "../components/tasks/data";
import { getAllTags } from "../services/tagService";
import TaskBoard from "../components/tasks/taskBoard";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
  const tasks: taskData[] = await getAllTasks(session?.user.id ?? "");
  const tags: tagData[] = await getAllTags();

  return <TaskBoard tasks={tasks} tags={tags} />;
}