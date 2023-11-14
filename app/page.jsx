"use client";
import Image from "next/image";
import Dashboard from "./dashboard/page";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        href={"/dashboard"}
        className="h-[30px] bg-teal-900 text-white p-10 text-center items-center flex flex-col rounded-md"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
