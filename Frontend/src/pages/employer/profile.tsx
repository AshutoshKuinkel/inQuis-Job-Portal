import Sidebar from '../../components/employer/sidebar'
import { withAuth } from '../../hoc/with-auth.hoc'
import { Role } from '../../types/enum.types'

const Profile = () => {
  return (
    <div className='h-screen'>
      <div className='grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-screen'>
        {/* Sidebar */}
        <Sidebar/>

        {/* Main content section */}
        <div className='p-2'>
          Profile
        </div>
      </div>
    </div>
  )
}

const page = withAuth(Profile,[Role.EMPLOYER])
export default page
