import { headers } from "next/headers";

export default async function UserEmail() {
  const headerList = headers();
  const info = headerList.get("email");
  return info;
}
