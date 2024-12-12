import  { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { notify} from '../Components/NotificationComponent';

import { loginAsync,userSelector } from '../redux/reducers/userReducer';

const SignIn = () => {
    const dispatch= useDispatch();
    const [userData , setUserData ] = useState({email:"",password:""});
    const {loading} =useSelector(userSelector);
    
   async function handlesignIn(e){
        e.preventDefault()
      const result= await dispatch(loginAsync(userData))
        if(loginAsync.fulfilled.match(result)){

            notify('Sign in successful!')
        } else {
            notify(result.payload || 'Something went wrong');
          }
        setUserData({email:"",password:""})     
    }
    function handleChange(e){
        const key=e.target.name;
        const value=e.target.value;
        userData[key]=value;
        setUserData({...userData});
    }

  return (
    <div className='top-6'>
    <div className='w-full h-[70vh] flex items-center justify-center'>
        <form onSubmit={handlesignIn}  className=' flex items-center justify-center gap-6 flex-col mt-6 border-2 border-black rounded-md  p-12 bg-blue-100'>
            <h1 className=' text-3xl font-extrabold '>Sign In</h1>
            
            
            <input onChange={handleChange} value={userData.email} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="email" name="email" id="email" placeholder='Enter your Email' />
            <input onChange={handleChange} value={userData.password} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="password" name="password" id="password" placeholder='Enter your Password' />
            <div className=' w-full'>
<button disabled={loading} className=' w-full bg-blue-500 hover:bg-blue-600 rounded-md py-2 text-lg font-semibold text-white'>{loading ? 'Logging in...' : 'Login'}</button>
<Link to={'/signup'} >
    <h1 className=' mt-3 font-bold'>Or SingUp instead </h1>
</Link>
</div>
           

        </form>
    </div>
</div>
  )
}

export default SignIn

