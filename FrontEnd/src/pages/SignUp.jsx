import  { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import {registerAsync,  userSelector } from '../redux/reducers/userReducer';
import {notify} from '../Components/NotificationComponent';
const SignUp = () => {
    const dispatch= useDispatch();
    const [userData , setUserData ] = useState({email:"",password:""})
    const {loading} = useSelector(userSelector);
   async function handlesignUp(e){
        e.preventDefault()
      const  result= await dispatch(registerAsync(userData));
        if(registerAsync.fulfilled.match(result))
        notify('Registration Successful! ')
    else
        notify(result.palload || "Somthing went Wrong!")

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
        <form onSubmit={handlesignUp}  className=' flex items-center justify-center gap-6 flex-col mt-6 border-2 border-black rounded-md  p-12 bg-blue-100'>
            <h1 className=' text-3xl font-extrabold '>Sign Up</h1>
           
            <input onChange={handleChange} value={userData.email} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="email" name="email" id="email" placeholder='Enter your Email' />
            <input onChange={handleChange} value={userData.password} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="password" name="password" id="password" placeholder='Enter your Password' />
            <button disabled={loading} className=' w-full bg-blue-500 hover:bg-blue-600 rounded-md py-2 text-lg font-semibold text-white' >{loading ? 'Registering...' : 'Register'}</button>
           

        </form>
    </div>
</div>
  )
}

export default SignUp