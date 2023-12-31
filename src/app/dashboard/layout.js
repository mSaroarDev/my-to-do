import SideNavbar from "@/components/SideNavbar";

export const metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function Layout({ children }) {
  return (
    <>
      <SideNavbar />
      <div className="admin-contents">{children}</div>
    </>
  );
}
