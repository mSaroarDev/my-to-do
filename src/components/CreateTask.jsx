"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateTask({folderId, folderName, uid}) {
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      taskName: "",
      fid: parseInt(folderId),
      createdBy: uid,
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      const url = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(url + "/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.status === 200) {
        showSuccess("Added successfully");
        resetForm();
        router.refresh();
        document.getElementById("my_modal_1").close();
      } else {
        showError("Failed to add");
      }
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="stats flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
          </svg>

          <h1 className="text-lg font-bold">
            {folderName.name}
          </h1>
        </div>
        <div>
          <button
            className="btn flex items-center gap-3"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            New Task
          </button>
        </div>
      </div>

      {/* modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="modal-action text-right">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="-mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <label className="font-bold text-lg" htmlFor="title">
              Task Description <span className="text-red-500 text-xs">*</span>{" "}
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={formik.values.taskName}
              onChange={formik.handleChange}
              placeholder=""
              className="input input-bordered w-full"
            />
            <button className="btn btn-neutral" type="submit">
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
