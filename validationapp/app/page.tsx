import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getAllTasks } from "./services/taskService";
import TaskBoard from "./components/tasks/taskBoard";
import { getAllTags } from "./services/tagService";
import { tagData, taskData } from "./components/tasks/data";

export default async function Home() {
  return <></>;
}
