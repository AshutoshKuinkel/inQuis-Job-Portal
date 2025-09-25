import Logo from '../../assets/logo';
import { SidebarLinks } from '../../components/employer/sidebar-links';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Logo + text */}
      <div className="flex flex-col items-start gap-1 mb-8">
        <Logo />
        <p className="text-gray-500">Employer</p>
      </div>

      {/* Icons + Buttons */}
      <div className="flex flex-col space-y-4">
        <SidebarLinks />
      </div>
    </div>
  );
};

export default Sidebar;
