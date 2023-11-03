"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Toast from "./Tost";

export default function RegisterForm() {

  // alert
  const showError = (message) => toast.error(message);
  const showSuccess = (message) => toast.success(message);

  // route
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },

    onSubmit: async (values, {resetForm}) => {
      if(!values.name || !values.email || !values.password){
        showError("All fields are required");
      }else{
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })

        
        if(res.status === 406){
          console.log("here")
          showError("Email already exist");
        }else if(res.status === 200){
          showSuccess("Registration Successfull");
          resetForm();
          router.refresh();
          router.replace("/login")
        }else{
          showError("Registration failed!")
        }
      }
    }
  })

  return (
    <>
    <Toast />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="email">Enter Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="John Doe"
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="example@email.com"
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="password">Enter Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="******"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn-primary mt-2">
          Register
        </button>
      </form>
    </>
  );
}
