"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Toast from "./Tost";

export default function LoginForm() {
  const router = useRouter();

  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values, { resetForm }) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status === 200) {
        showSuccess("Login Success");
        resetForm();
        router.refresh();
        router.replace("/dashboard");
      }else{
        showError("Incorrect Email or Password");
      }
    },
  });

  return (
    <>
      <Toast />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="example@email.com"
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="password">Enter Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="******"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn-primary mt-2">
          Login
        </button>
      </form>
    </>
  );
}
