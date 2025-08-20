import type { ReactElement } from "react";

interface SidebarItemsProps {
  text: string;
  icon: ReactElement;
  isActive?: boolean;
  isLogout?: boolean;
}

function SidebarItems({ text, icon, isActive = false, isLogout = false }: SidebarItemsProps) {
  return (
    <div
      className={`flex text-gray-700 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-75 ${
        isLogout
          ? "hover:bg-red-100 hover:text-red-600"
          : isActive
          ? "bg-blue-100 text-blue-700 border-r-4 border-blue-500"
          : "hover:bg-gray-200"
      }`}
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default SidebarItems;
