import { auth } from "@clerk/nextjs/server";

export default async function Profile() {
  await auth.protect();

  return <div>profile</div>;
}
