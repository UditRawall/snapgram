import { bottombarLinks } from '@/constant';

import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const {pathname} = useLocation();
  return (
    <section className='bottom-bar'>
          {bottombarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              
                <Link
                key={link.label}
                to={link.route}
                className={`  ${
                  isActive && "bg-primary-500 rounded-[10px]"
                } flex-center flex-col gap-1 p-2 transition`}
                  
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className="group-hover: invert-white"
                  />
                  <p>{link.label}</p>
                </Link>
             
            );
          })}

    </section>
  )
}

export default Bottombar