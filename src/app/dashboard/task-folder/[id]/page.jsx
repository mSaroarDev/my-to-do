import CreateTask from "@/components/CreateTask";
import Task from "@/components/Task";
import TaskCompleted from "@/components/TaskCompleted";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import Link from "next/link";

export default async function TaskPage({ params }) {
  const folderId = params.id;

  // get user
  const headerList = headers();
  const userId = await headerList.get("id");

  // get folder name
  const folderName = await prisma.folder.findUnique({
    where: {
      id: parseInt(folderId)
    }
  })

  // fetch data if have
  const items = await prisma.task.findMany({
    where: {
      folderId: parseInt(folderId),
      status: "NotCompleted",
    },
  });


  const completedItems = await prisma.task.findMany({
    where: {
      folderId: parseInt(folderId),
      status: "Completed",
    }
  })


  return (
    <>
      <Link
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/task-folder`}
        className="btn mb-5 flex items-center justify-center gap-2 w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
        Back to Taskgroup
      </Link>
      <CreateTask folderId={folderId} folderName={folderName} uid={parseInt(userId)} />

      <div className="task-groups flex flex-col gap-3 mt-7">
        {items &&
          items.map((item, index) => {
            return <Task key={items.id} index={index} data={item} />;
          })}
      </div>

      <div className="task-groups flex flex-col gap-3 mt-7">
        
     {
      completedItems.length > 0 ? (
        <>
            <h3>Completed Tasks</h3>
            {completedItems.map((item) => {
              return <TaskCompleted key={item.id} data={item} />;
            })}
          </>
      ) : (
        ""
      )
     }
          
      </div>
      
    </>
  );
}
