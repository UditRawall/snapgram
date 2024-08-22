
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = true;
  return (
<>
{isAuthenticated ? (
  <Navigate to='/'/>
):(
  <>
  <section className='flex justify-center items-center flex-1 flex-col py-10'>
    <Outlet/>
  </section>

  <img src='/assets/images/side-img.svg' alt='logo' className='hidden xl:block w-1/2 object-cover bg-no-repeat'/>
  </>

)}
</>  )
}

export default AuthLayout