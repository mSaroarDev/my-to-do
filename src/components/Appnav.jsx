import Link from "next/link";

export default function Appnav() {
  return (
    <>
      <div className="bg-white shadow-md w-full fixed top-0 z-50">
        <div className="px-10">
          <div className="navbar">
            <div className="flex-1">
              <Link href={"/"} className="normal-case text-lg font-bold">
                What<span className="text-green-600">ToDo</span>?
              </Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>
                {/* <li>
                  <details>
                    <summary>Parent</summary>
                    <ul className="p-2 bg-base-100">
                      <li>
                        <a>Link 1</a>
                      </li>
                      <li>
                        <a>Link 2</a>
                      </li>
                    </ul>
                  </details>
                </li> */}
                <li>
                  <Link href={"/about"}>About</Link>
                </li>
                <li>
                  <Link href={"/login"}>Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
