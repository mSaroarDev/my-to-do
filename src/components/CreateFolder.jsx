"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateFolder({userId}) {
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      createdBy: parseInt(userId),
    },

    onSubmit: async (values, { resetForm }) => {
      const url = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(url + "/api/folder/create", {
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
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
              clipRule="evenodd"
            />
          </svg>

          <h1 className="text-lg font-bold">Task Group</h1>
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
            New Task Group
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
              Task Group Title <span className="text-red-500 text-xs">*</span>{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
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
