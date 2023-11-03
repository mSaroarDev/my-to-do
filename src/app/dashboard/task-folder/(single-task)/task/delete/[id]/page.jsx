import TaskDeleteBox from "@/components/TaskDeleteBox";
import prisma from '@/lib/db';

export default async function EditFolderName({params}) {

    const taskId = params.id;
    
    const data = await prisma.task.findUnique({
        where: {
            id: parseInt(taskId),
        }
    })

  return (
    <>
      <div className="w-full h-[600px] flex items-center justify-center">
        <TaskDeleteBox data={data} />
      </div>
    </>
  );
}