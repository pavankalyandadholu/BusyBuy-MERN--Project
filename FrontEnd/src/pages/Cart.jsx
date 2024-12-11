import { useDispatch } from 'react-redux';
import { initialStateAsync } from '../redux/reducers/cartReducer';
import AllCartCards from '../Components/AllCartCards'
import CartTotalAmount from '../Components/CartTotalAmount';
import { useEffect } from 'react';

const Cart = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(initialStateAsync())
  },[])
  
    
  return (
    <>


      <div className='  flex flex-col sm:flex-row items-start justify-center gap-5'>
      <CartTotalAmount/>

      <AllCartCards/>
    </div>
    </>
  )
}

export default Cart