"use client";

import Link from "next/link";
import Login from "./ui/login/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 bg-slate-100">
      <div className=" h-[600px] w-[400px] border-4 bg-white justify-center flex flex-col items-center">
        Image here
      </div>
      <Login />
    </main>
  );
}
