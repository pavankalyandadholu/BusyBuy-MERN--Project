import  { useState } from 'react'
import {  useDispatch } from 'react-redux';
import { userActions } from '../redux/reducers/userReducer';
import {NotificationComponent,notify} from '../Components/NotificationComponent';
const SignUp = () => {
    const dispatch= useDispatch();
    const [userData , setUserData ] = useState({name:"",email:"",password:""})
    function handlesignUp(e){
        e.preventDefault()

        dispatch(userActions.registerUser(userData))
        notify('Register Successful! ')
        setUserData({name:"",email:"",password:""})
        
    }
    function handleChange(e){
        const key=e.target.name;
        const value=e.target.value;
        userData[key]=value;
        setUserData({...userData});
    }

  return (
    <div className='top-6'>
        <NotificationComponent  />
    <div className='w-full h-[70vh] flex items-center justify-center'>
        <form onSubmit={handlesignUp}  className=' flex items-center justify-center gap-6 flex-col mt-6 border-2 border-black rounded-md  p-12 bg-blue-100'>
            <h1 className=' text-3xl font-extrabold '>Sign Up</h1>
            <input onChange={handleChange} value={userData.name} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="text" name="name" id="name" placeholder='Enter your Name' />
            <input onChange={handleChange} value={userData.email} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="email" name="email" id="email" placeholder='Enter your Email' />
            <input onChange={handleChange} value={userData.password} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="password" name="password" id="password" placeholder='Enter your Password' />
            <button className=' w-full bg-blue-500 hover:bg-blue-600 rounded-md py-2 text-lg font-semibold text-white' >Sign Up</button>
           

        </form>
    </div>
</div>
  )
}

export default SignUp