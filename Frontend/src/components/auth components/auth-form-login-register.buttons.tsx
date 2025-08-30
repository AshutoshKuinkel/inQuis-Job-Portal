import {Link, useLocation} from 'react-router';

const links:{label:string,link:string}[] = [
  {
    label:'Sign In',
    link:'/login'
  },
  {
    label:'Sign Up',
    link:'/signup'
  }
]

export const NavLinks = ()=>{
  const location = useLocation()
  const active_path = location.pathname
  return(
    <div className='mt-8 bg-[#F3F3F5] w-2xs sm:w-sm rounded-xl flex justify-evenly'>
      {
        links.map((item,index)=>(
          <Link key={`${item.link}-${index}`} to={item.link} className={`${active_path === item.link && 'bg-white rounded-2xl scale-93'}`}>
            <button className="text-xs sm:text-sm text-[#2c3e50] hover:cursor-pointer px-12 sm:px-17 py-2">{item.label}</button>
          </Link>
        ))
      }
    </div>
  )
}