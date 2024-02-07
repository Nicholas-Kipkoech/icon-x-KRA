"use client";

import Link from "next/link";
import Login from "./ui/login/page";
import { useState } from "react";
import Signup from "./ui/Signup/page";
import Image from "next/image";
import EtimsPng from "./assets/etims.png";
import dotenv from "dotenv";
dotenv.config();

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleView = () => {
    setIsLogin((prevLogin) => !prevLogin);
  };
  return (
    <main className="flex min-h-screen items-center md:justify-center md:flex justify-between sm:justify-center xl:justify-center xl:flex 2xl:justify-center p-24 bg-slate-100">
      <Image
        src={EtimsPng}
        alt=""
        className="h-[600px] sm:hidden md:hidden md:w-[200px] lg:hidden xl:block xl:w-[600px] xl:h-[600px] 2xl:h-[600px]  w-[auto] "
        priority
      />

      {isLogin ? (
        <Login toggleView={toggleView} />
      ) : (
        <Signup toggleView={toggleView} />
      )}
    </main>
  );
}
