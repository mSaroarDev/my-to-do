import Toploader from "@/components/Toploader";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const Siliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  title: "MyToDo",
  description: "Ultimate To Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Siliguri.className}>
        <Toploader />
        {children}
      </body>
    </html>
  );
}
