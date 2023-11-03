import TaskEditBox from "@/components/TaskEditBox";
import prisma from "@/lib/db";

export default async function EditFolderName({ params }) {
  const taskId = params.id;

  const data = await prisma.task.findUnique({
    where: {
      id: parseInt(taskId),
    },
  });

  console.log(data)

  return (
    <>
      <div className="w-full h-[600px] flex items-center justify-center">
        <TaskEditBox data={data} />
      </div>
    </>
  );
}