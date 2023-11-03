"use client"
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TaskEditBox({data}) {

    const router = useRouter();

    const showSuccess = (message) => toast.success(message);
    const showError = (message) => toast.error(message);

    
    const formik = useFormik({
        initialValues: {
            name: data.taskName,
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
                showSuccess("Edited Succesfully");
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
          <label className="font-bold text-lg" htmlFor="title">
            Edit Task <span className="text-red-500 text-xs">*</span>{" "}
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
