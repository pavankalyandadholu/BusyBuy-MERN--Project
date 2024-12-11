import { useDispatch ,useSelector} from 'react-redux';
import { initialStateAsync ,cartSelector} from '../redux/reducers/cartReducer';
import AllCartCards from '../Components/AllCartCards'
import CartTotalAmount from '../Components/CartTotalAmount';
import { useEffect } from 'react';

const Cart = () => {
  const {cart}=useSelector(cartSelector);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(initialStateAsync())
  },[])
  
    
  return (
    <>
    {
      cart.length>0 ? 
      <div className='  flex flex-col sm:flex-row items-start justify-center gap-5'>
      <CartTotalAmount/>

      <AllCartCards/>
        </div>:
        <h1 className=' mt-14 text-3xl text-center'>Cart is Empty! </h1>
    }

    </>
  )
}

export default Cart