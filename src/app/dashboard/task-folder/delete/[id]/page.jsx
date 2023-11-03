import FolderDeleteBox from "@/components/FolderDeleteBox";
import FolderEditBox from "@/components/FolderEditBox";
import prisma from '@/lib/db';

export default async function EditFolderName({params}) {

    const folderId = params.id;
    
    const data = await prisma.folder.findUnique({
        where: {
            id: parseInt(folderId),
        }
    })

  return (
    <>
      <div className="w-full h-[600px] flex items-center justify-center">
        <FolderDeleteBox data={data} />
      </div>
    </>
  );
}
