import Appnav from "@/components/Appnav";
import Image from "next/image";
import Link from "next/link";
import heroimage from "public/undraw_completed_tasks_vs6q.svg";

export default function Homepage() {
  return (
    <>
      <Appnav />
      <div className="pt-24">
        <div className="container">
          <div className="h-[500px] w-full flex items-center justify-between">
            <div>
              <p className=" font-bold text-base">The ultimate solution</p>
              <h1 className="font-bold text-5xl my-5">
                Online ToDo App <br /> For{" "}
                <span className="text-red-500">Totally Free</span>
              </h1>
              <p>
                No need to subscribe. <br /> Just Register and enjoy the app!
              </p>
              <Link href={"/register"}>
                <button className="btn-primary mt-7">Get Started</button>
              </Link>
            </div>
            <div>
              <Image
                src={heroimage}
                width={400}
                height={400}
                alt="Hero Image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
