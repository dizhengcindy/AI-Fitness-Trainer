import { auth } from "@clerk/nextjs/server";

export default async function GenerateProgram() {
  await auth.protect();

  return <div>GenerateProgram</div>;
}
