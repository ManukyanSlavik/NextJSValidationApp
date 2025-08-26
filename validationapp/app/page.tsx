import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getAllTasks } from "./services/taskService";
import Task, { taskData } from "./components/task";
import CreateTask from "./components/createTask";
import AuthProvider from "./api/auth/AuthProvider";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const tasks: taskData[] = await getAllTasks(session?.user.id ?? "");

  return (
    <div className="grid place-items-center pt-4">
      <AuthProvider>
        <CreateTask />
      </AuthProvider>
      <hr />
      {tasks.length === 0 && <p className="mt-5">No tasks!</p>}
      {tasks.length !== 0 && <Task tasks={tasks} />}
    </div>
  );
}
