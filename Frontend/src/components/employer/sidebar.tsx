import Logo from '../../assets/logo'
import { SidebarLinks } from '../../components/employer/sidebar-links';

const Sidebar = () => {
  return (
    <div className="col-span-1 border-r border-[#E9EBED] flex-flex-col items-start min-h-screen">
      {/* Logo + text */}
      <div className="flex flex-col items-start gap-1 pl-4 mt-3">
        <Logo />
        <p className="text-gray-500 ">Employer</p>
      </div>
      {/* Icons + Buttons */}
      <div className="mt-8">
        <SidebarLinks />
      </div>
    </div>
  );
};

export default Sidebar;
