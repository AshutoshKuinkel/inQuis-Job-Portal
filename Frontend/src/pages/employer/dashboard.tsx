import { withAuth } from '../../hoc/with-auth.hoc'
import { Role } from '../../types/enum.types'
import Logo from '../../assets/logo'
import { SidebarLinks } from '../../components/employer/sidebar-links';

const EmployerDashboard = () => {
  return (
    <div className='h-screen'>
      <div className='grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-screen'>
        {/* Sidebar */}
        <div className='col-span-1 border-r-1 flex-flex-col items-start mt-3'>
          {/* Logo + text */}
          <div className='flex flex-col items-start gap-1 pl-4'>
            <Logo/>
            <p className='text-gray-500 '>Employer</p>
          </div>

          {/* Icons + Buttons */}
          <div className='mt-8'>
            <SidebarLinks/>
          </div>
        </div>

        {/* Main content section */}
        <div className='p-2'>
          Content
        </div>
      </div>
    </div>
  )
}

const page = withAuth(EmployerDashboard,[Role.EMPLOYER])
export default page
