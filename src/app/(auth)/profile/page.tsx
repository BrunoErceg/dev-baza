import { auth } from "@/auth";

export default async function profile() {
  const session = await auth();

  return (
    <div>
      <div className="container mx-auto flex justify-center bg-amber-300">
        <h1>Profile</h1>
      </div>
    </div>
  );
}
