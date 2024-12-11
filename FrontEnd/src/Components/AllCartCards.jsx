import CartCard from './CartCard'
import { useSelector, } from 'react-redux';
import { cartSelector } from '../redux/reducers/cartReducer';
const AllCartCards = () => {
  const {cart}= useSelector(cartSelector);
    return (
        <div className=' flex items-center justify-center flex-wrap gap-8 mt-6'>
    
        {
        cart.length >0  && cart.map((p,i)=><CartCard key={i} product={p}/>
        )
      
        }
        </div>
      )
}

export default AllCartCards