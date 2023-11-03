"use client";
import DateConvert from "@/utils/DateConvert";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TaskGroupCard({ data, index, totalTasks }) {

  const {name} = data;

  const date = (dbDate) => DateConvert(dbDate);

  const formik = useFormik({
    initialValues: {
      name: name,
    },
  });

  const router = useRouter();

  const deleteFolder = () => {
    router.push(`/dashboard/task-folder/delete/${data.id}`);
  };

  const editFolder = () => {
    router.push(`/dashboard/task-folder/edit/${data.id}`);
  };

  return (
    <>
      <Link
        className="cursor-pointer"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/task-folder/${data.id}`}
      >
        <div className="bg-slate-50 hover:bg-slate-100 rounded-md shadow-md p-5 flex items-center justify-start gap-3 z-30">
          <div className="bg-green-500 text-white text-3xl font-bold h-12 w-12 rounded-md flex items-center justify-center">
            {index + 1}
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-1 flex-col items-start justify-between">
              <h3 className="text-base font-bold">{data.name}</h3>
              <p>{totalTasks} Tasks • Created: {date(data.createdAt)}</p>
            </div>
            <div className="flex gap-3 items-center">
              <span
                className="z-50"
                title="edit"
                onClick={(event) => {
                  event.preventDefault(); // Prevent link navigation
                  editFolder();
                }}
              >
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>
              </span>
              <span
                className="z-50"
                title="delete"
                onClick={(event) => {
                  event.preventDefault(); // Prevent link navigation
                  deleteFolder();
                }}
              >
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* edit modal */}
      <dialog id="my_modal_edit" className="modal">
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
          <form className="flex flex-col gap-3">
            <label className="font-bold text-lg" htmlFor="title">
              Edit Group Title <span className="text-red-500 text-xs">*</span>{" "}
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
