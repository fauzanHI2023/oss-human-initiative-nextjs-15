import React from "react";
import { menuItems } from "@/data/data";
import SubMenu from "@/components/SubMenu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const Menu = () => {
  return (
    <ul className={`hidden sm:flex flex-row relative mt-4 w-auto px-4 gap-x-6`}>
      {menuItems.map((item) => (
        <li key={item.id} className="relative group text-base font-normal pb-2">
          <Link
            href={item.url}
            className="flex flex-row dark:hover:text-slate-200 dark:text-slate-300 hover:text-slate-700 hover:font-semibold transition duration-200 ease-in text-slate-500 text-base font-semibold"
          >
            {item.label} <ChevronDown className="text-sm w-4" />
          </Link>
          {item.subMenu && <SubMenu items={item.subMenu} />}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
