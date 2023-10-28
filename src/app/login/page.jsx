import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";
import loginimage from "public/login.svg";

export default function LoginPage() {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="bg-slate-100 p-5 rounded-lg shadow-lg">
          <div>
            <Link href={"/"}  className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Homepage
            </Link>
          </div>
          <div className="flex items-center justify-between gap-10 p-16">
            <div>
              <Image src={loginimage} height={300} width={300} alt="Login" />
            </div>
            <div>
              <div className="login-form">
                <h3 className="text-xl font-bold mb-7">
                  Login to your account...
                </h3>
                <LoginForm />
                <div className="mt-5 text-right">
                  <Link className="underline" href={"/register"}>
                    Create an account...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
