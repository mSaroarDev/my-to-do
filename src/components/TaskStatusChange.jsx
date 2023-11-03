"use client"
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TaskStatusChange({data}) {

    const router = useRouter();

    const showSuccess = (message) => toast.success(message);
    const showError = (message) => toast.error(message);

    
    const formik = useFormik({
        initialValues: {
            status: "Completed",
        },

        onSubmit: async (values) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/task/edit/${data.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if(res.status === 200){
                showSuccess("Completed Succesfully");
                router.refresh();
                router.push("/dashboard/task-folder/" + data.folderId)
            }else{
                showError("Failed")
            }
        }
    })

  return (
    <>
      <div className="box w-[700px] h-auto bg-slate-100 p-10 rounded-md shadow-md">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <label className="font-bold text-lg text-center mb-10" htmlFor="title">
            Are you sure you want to Mark as Completed? 
          </label>
          <button className="btn btn-success" type="submit">
            Yes, Completed
          </button>
        </form>
        <button className="btn btn-neutral mt-2 w-full">No, Back</button>
      </div>
    </>
  );
}
