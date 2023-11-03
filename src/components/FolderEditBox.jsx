"use client"
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FolderEditBox({data}) {

    const router = useRouter();

    const showSuccess = (message) => toast.success(message);
    const showError = (message) => toast.error(message);

    const folderName = data.name;
    
    const formik = useFormik({
        initialValues: {
            name: folderName,
        },

        onSubmit: async (values) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder/edit/${data.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if(res.status === 200){
                showSuccess("Edited Succesfully");
                router.refresh();
                router.push("/dashboard/task-folder")
            }else{
                showError("Failed")
            }
        }
    })

  return (
    <>
      <div className="box w-[700px] h-auto bg-slate-100 p-10 rounded-md shadow-md">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <label className="font-bold text-lg" htmlFor="title">
            Edit Group Title <span className="text-red-500 text-xs">*</span>{" "}
          </label>
          <input
            type="text"
            placeholder=""
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="input input-bordered w-full"
          />
          <button className="btn btn-neutral" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
