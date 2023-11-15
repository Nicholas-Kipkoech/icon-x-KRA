"use client";

import Link from "next/link";
import Login from "./ui/login/page";
import { useState } from "react";
import Signup from "./ui/Signup/page";
import Image from "next/image";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleView = () => {
    setIsLogin((prevLogin) => !prevLogin);
  };
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 bg-slate-100">
      <div
        className=" h-[600px] w-[100%] border-4 bg-cover object-contain bg-white justify-center flex flex-col items-center"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-photo/isolated-shot-surprised-clever-student-with-intelligent-look_273609-28048.jpg?w=1380&t=st=1700048390~exp=1700048990~hmac=1e9fa5ac4638c8de465174179ca3bd0fc79dccf6a42f0f8d3cb50bcf4e413696")`,
        }}
      ></div>
      {isLogin ? (
        <Login toggleView={toggleView} />
      ) : (
        <Signup toggleView={toggleView} />
      )}
    </main>
  );
}
