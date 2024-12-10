import CartCard from './CartCard'
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducers/userReducer';
const AllCartCards = () => {
    const {isLoggedIn}= useSelector(userSelector);
    // const profileData= getProfileContextValues();
    return (
        <div className=' flex items-center justify-center flex-wrap gap-8 mt-6'>
    
        {
        isLoggedIn &&  isLoggedIn.cart.map((p,i)=><CartCard key={i} product={p}/>)
      
        }
        </div>
      )
}

export default AllCartCards