"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`p-[20px] flex items-center gap-[10px] text-white hover:bg-[#2e2f3b] hover:text-white m-[5px] rounded-[10px] ${
        pathname === item.path && "bg-[#151847]"
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
