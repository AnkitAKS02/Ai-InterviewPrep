import { Outlet } from "react-router-dom";
import Sidebar from "../../components/communityComponents/Sidebar.jsx";

const CommunityLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Dynamic content area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet /> 
      </div>
    </div>
  );
};

export default CommunityLayout;
