import { useSelector } from 'react-redux';
import { Outlet,NavLink } from 'react-router-dom'
// import { getProfileContextValues } from '../Contexts/profileContext'
import { userSelector } from '../redux/reducers/userReducer';
const Navbar = () => {
  const {isLoggedIn}=useSelector(userSelector);
  return (<>
  
    <nav className=' w-full flex flex-col flex-wrap md:flex-row md:justify-between md:p-8 items-center px-5 py-4 gap-5 shadow-lg rounded-md '>
      
        <div className=' text-xl font-medium'>
         Busy Buy
        </div>
        <div className='gap-5 flex justify-between items-center text-lg'>
          {/* each item */}
          <NavLink to={'/'} >
          <div className=' flex items-center justify-center gap-2'>
            <img className=' w-6 hidden sm:inline' src="https://cdn-icons-png.flaticon.com/128/619/619032.png" alt="" />
            <h1 className='text-lg'> Home</h1> 
          </div>

          </NavLink>
          <NavLink to={'/orders'} >
          <div className=' flex items-center justify-center gap-2'>
            <img className=' w-6 hidden sm:inline' src="https://cdn-icons-png.flaticon.com/128/14266/14266271.png" alt="" />
            <h1 className='text-lg'> My Orders</h1> 
          </div>
          </NavLink>
          <NavLink to={'/cart'} >
          <div className=' flex items-center justify-center gap-2'>
            <img className=' w-6 hidden sm:inline' src="https://cdn-icons-png.flaticon.com/128/9284/9284424.png" alt="" />
            <h1 className='text-lg'> Cart</h1> 
          </div>
          </NavLink>
          {
            isLoggedIn ? 
          <NavLink to={'/logout'} >
          <div className=' flex items-center justify-center gap-2'>
            <img className=' w-6 hidden sm:inline' src="https://cdn-icons-png.flaticon.com/128/1574/1574351.png" alt="" />
            <h1 className='text-lg'> Logout</h1> 
          </div>
          </NavLink>:
          <NavLink to={'/signin'} >
          <div className=' flex items-center justify-center gap-2'>
            <img className=' w-6 hidden sm:inline' src="https://cdn-icons-png.flaticon.com/128/4856/4856698.png" alt="" />
            <h1 className='text-lg'> SignIn</h1> 
          </div>
          </NavLink>
          }

        
          
         
        </div>
    </nav>
    <Outlet/>
  </>
  )
}

export default Navbar