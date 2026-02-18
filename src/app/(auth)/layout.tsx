import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Logo } from "@components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-center gap-2 md:justify-between">
          <Logo className="text-3xl" />
          <Link
            href="/"
            className="flex items-center gap-1 font-medium duration-200 hover:gap-2 hover:opacity-70"
          >
            <ArrowLeft size={17} />
            Natrag na početnu
          </Link>
        </div>

        {children}
      </div>
      <div className="relative gap-4 overflow-hidden bg-gray-200 py-20 lg:block dark:bg-gray-200">
        <img
          src="/dashboard-screen-2.png"
          alt="Image"
          className="absolute top-[50%] left-20 translate-y-[-50%] rounded-md object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
