import Logo from "../icons/Logo";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItems from "./SidebarItems";

function Sidebar() {
  return (
    <div className=" pl-6 h-screen bg-white border-r w-72 fixed left-0 top-0">
      <div className="flex text-2xl pt-4 items-center">
        <div>
          <Logo />
        </div>
        SnapShot
      </div>
      <div className="pt-8 pl-4">
        <SidebarItems text="Twitter" icon={<TwitterIcon />} />
        <SidebarItems text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
}

export default Sidebar;
