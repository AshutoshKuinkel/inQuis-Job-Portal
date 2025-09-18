import {Link, useLocation} from 'react-router';

const links:{label:string,link:string}[] = [
  {
    label:'Profile Information',
    link:'/employer/profile'
  },
]

export const EmployerProfileButton = ()=>{
  const location = useLocation()
  const active_path = location.pathname
  return(
    <div className='bg-[#F3F3F5] w-2xs sm:w-[60vw] rounded-xl flex justify-evenly'>
      {
        links.map((item,index)=>(
          <Link key={`${item.link}-${index}`} to={item.link} className={`flex-1 ${active_path === item.link && 'bg-white rounded-2xl scale-93 '}`}>
            <button className="text-xs sm:text-sm text-[#2c3e50] hover:cursor-pointer  w-full text-center py-2">{item.label}</button>
          </Link>
        ))
      }
    </div>
  )
}