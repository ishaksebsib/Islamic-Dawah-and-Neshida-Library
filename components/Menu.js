import * as Icon from "react-feather";

export default function Menu({}) {
  return (
    <div className="bg-bgcolor py-2 flex gap-4 items-center justify-center font-inter text-xs">
      <button className="bg-white rounded-md px-3 py-1 ">Neshida</button>
      <button className="bg-white rounded-md px-2 py-1">Neshida</button>
      <button className="bg-white rounded-md px-2 py-1">Neshida</button>
      <button className="bg-white rounded-md px-2 py-1">Neshida</button>

      <Icon.Moon size={20} className=" stroke-black  " />
    </div>
  );
}
