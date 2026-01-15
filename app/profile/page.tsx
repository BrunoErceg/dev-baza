import { getServerSession } from "next-auth";
export default async function profile() {
  const session = await getServerSession();
  return (
    <div>
      <h1>Profile: {session?.user?.name}</h1>
    </div>
  );
}
