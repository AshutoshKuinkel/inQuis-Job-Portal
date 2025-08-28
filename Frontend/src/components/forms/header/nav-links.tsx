import {Link} from "react-router"

const links:{label:string,link:string}[] = [
  {
    label:'Find Jobs',
    link:'/jobs',
  },
  {
    label:'About Us',
    link:'/about',
  },
  {
    label:'Post a Job',
    link:'/employer/createJob',
  },
]

export const NavLinks = ()=>{
  return(
    <div className="flex items-baseline space-x-8">
      {
        links.map((item)=>(
          <Link key={`${item.link}`} to={item.link} className="space-x-5 text-gray-500 text-sm hover:cursor-pointer">
            <span className="hover:text-[#2c3e50]">{item.label}</span>
          </Link>
        ))
      }
    </div>
  )
}
