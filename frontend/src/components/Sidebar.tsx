import { useNavigate } from "react-router-dom";
import AllContent from "../icons/AllContent";
import Logo from "../icons/Logo";
import Logout from "../icons/Logout";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItems from "./SidebarItems";

type FilterType = "all" | "youtube" | "twitter";

interface SidebarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

function Sidebar({ activeFilter, onFilterChange }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear token from localStorage
      localStorage.removeItem("token");
      
      // Navigate to login page
      navigate("/signin");
    }
  };

  return (
    <div className="pl-6 h-screen bg-white border-r w-72 fixed left-0 top-0 flex flex-col">
      <div className="flex text-2xl pt-4 items-center">
        <div>
          <Logo />
        </div>
        SnapShot
      </div>
      <div className="pt-8 pl-4 flex-1">
        <div onClick={() => onFilterChange("all")}>
          <SidebarItems
            text="All Contents"
            icon={<AllContent />}
            isActive={activeFilter === "all"}
          />
        </div>
        <div onClick={() => onFilterChange("twitter")}>
          <SidebarItems
            text="Twitter"
            icon={<TwitterIcon />}
            isActive={activeFilter === "twitter"}
          />
        </div>
        <div onClick={() => onFilterChange("youtube")}>
          <SidebarItems
            text="Youtube"
            icon={<YoutubeIcon />}
            isActive={activeFilter === "youtube"}
          />
        </div>
      </div>
      
      {/* Logout button at the bottom */}
      <div className="pl-4 pb-6">
        <div onClick={handleLogout}>
          <SidebarItems
            text="LogOut"
            icon={<Logout />}
            isLogout={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
