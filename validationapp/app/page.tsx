import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getAllTasks } from "./services/taskService";
import { taskData } from "./components/task";
import TaskBoard from "./components/taskBoard";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const tasks: taskData[] = await getAllTasks(session?.user.id ?? "");

  return (
    <TaskBoard tasks={tasks} />
  );
}
