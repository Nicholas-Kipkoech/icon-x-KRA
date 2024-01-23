"use client";

import Link from "next/link";
import Login from "./ui/login/page";
import { useState } from "react";
import Signup from "./ui/Signup/page";
import Image from "next/image";
import EtimsPng from "./assets/etims.png";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleView = () => {
    setIsLogin((prevLogin) => !prevLogin);
  };
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 bg-slate-100">
      <Image src={EtimsPng} alt="" className="h-[600px] w-[auto]" priority />
      {isLogin ? (
        <Login toggleView={toggleView} />
      ) : (
        <Signup toggleView={toggleView} />
      )}
    </main>
  );
}
