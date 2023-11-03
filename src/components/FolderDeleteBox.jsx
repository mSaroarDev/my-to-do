"use client"
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FolderDeleteBox({data}) {

    const router = useRouter();

    const showSuccess = (message) => toast.success(message);
    const showError = (message) => toast.error(message);

    const folderId = data.id;
    
    const formik = useFormik({
        initialValues: {
            id: parseInt(folderId),
        },

        onSubmit: async (values) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder/delete/${data.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if(res.status === 200){
                showSuccess("Deleted Succesfully");
                router.refresh();
                router.push("/dashboard/task-folder")
            }else{
                showError("Failed")
            }
        }
    })

    const back = () => {
      router.push(process.env.NEXT_PUBLIC_BASE_URL + "/dashboard/task-folder");
    }

  return (
    <>
      <div className="box w-[700px] h-auto bg-slate-100 p-10 rounded-md shadow-md">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <label className="font-bold text-lg" htmlFor="title">
            Your are going to Delete &quot;{data.name}&quot;. Are you sure to delete it?{" "}
          </label>
          <input
            type="text"
            placeholder=""
            id="id"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
            hidden
          />
          <button className="btn text-red-500" type="submit">
            Yes, Delete
          </button>
        </form>
        <button onClick={back} className="btn btn-neutral w-full mt-2">
            No
          </button>
      </div>
    </>
  );
}
