import CreateFolder from "@/components/CreateFolder";
import TaskGroupCard from "@/components/TaskGroupCard";
import prisma from "@/lib/db";
import { headers } from "next/headers";

export default async function TaskGroupPage() {
  // returning the logged user
  const headerList = headers();
  const userId = headerList.get("id");

  // geting the folders items
  const folders = await prisma.folder.findMany({
    where: {
      createdBy: parseInt(userId),
    },
    orderBy: {
      id: "asc",
    },
  });

  // Create an array of promises for each folder's totalTasks
  const totalTasksPromises = folders.map(async (folder) => {
    const totalTasks = await prisma.task.count({
      where: {
        folderId: parseInt(folder.id),
        createdBy: parseInt(userId),
      },
    });
    return { totalTasks, folder };
  });

  const totalTasksResults = await Promise.all(totalTasksPromises);

  return (
    <>
      <CreateFolder userId={userId} />
      <div className="task-groups flex flex-col gap-3 mt-7">
        {totalTasksResults.map((result, index) => (
          <TaskGroupCard
            key={result.folder.id}
            totalTasks={result.totalTasks}
            data={result.folder}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
