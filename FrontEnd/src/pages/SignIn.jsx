import  { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/reducers/userReducer';
import { notify,NotificationComponent } from '../Components/NotificationComponent';
const SignIn = () => {
    const dispatch= useDispatch();
    const [userData , setUserData ] = useState({email:"one@gmail.com",password:"one@gmail.com"})
    
    function handlesignIn(e){
        e.preventDefault()
        dispatch(userActions.loginUser(userData))
        notify('sign in successful!')
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
        <NotificationComponent/>
    <div className='w-full h-[70vh] flex items-center justify-center'>
        <form onSubmit={handlesignIn}  className=' flex items-center justify-center gap-6 flex-col mt-6 border-2 border-black rounded-md  p-12 bg-blue-100'>
            <h1 className=' text-3xl font-extrabold '>Sign In</h1>
            
            <input onChange={handleChange} value={userData.email} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="email" name="email" id="email" placeholder='Enter your Email' />
            <input onChange={handleChange} value={userData.password} className=' border-2 border-black rounded-md p-2 placeholder:text-lg text-lg' type="password" name="password" id="password" placeholder='Enter your Password' />
            <div className=' w-full'>
<button className=' w-full bg-blue-500 hover:bg-blue-600 rounded-md py-2 text-lg font-semibold text-white'>Sign In</button>
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

