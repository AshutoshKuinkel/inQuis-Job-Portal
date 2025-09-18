import Sidebar from '../../components/employer/sidebar'
import { withAuth } from '../../hoc/with-auth.hoc'
import { Role } from '../../types/enum.types'

const ManageJobs = () => {
  return (
    <div className='h-screen'>
      <div className='grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-screen'>
        {/* Sidebar */}
        <Sidebar/>

        {/* Main content section */}
        <div className='p-2'>
          Manage Jobs
        </div>
      </div>
    </div>
  )
}

const page = withAuth(ManageJobs,[Role.EMPLOYER])
export default page
