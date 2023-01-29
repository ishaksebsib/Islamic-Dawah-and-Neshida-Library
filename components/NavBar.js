import { SearchContext } from "@/lib/context";
import { useContext, useState } from "react";
import * as Icon from "react-feather";
export default function NavBar({}) {
  const { seraching, setSearching } = useContext(SearchContext);

  return (
    <nav className=" h-14 bg-bgcolor w-[100%] flex items-center justify-between px-10">
      <Icon.Activity size={25} className=" stroke-black" />

      <input
        className=" w-52 h-6 rounded-md p-4 focus:outline-none"
        placeholder="Search"
        value={seraching}
        onChange={(e) => setSearching(e.target.value)}
      />
    </nav>
  );
}
