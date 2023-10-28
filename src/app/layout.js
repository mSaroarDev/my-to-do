import { Hind_Siliguri } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const Siliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "MyToDo",
  description: "Ultimate To Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Siliguri.className}>
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
