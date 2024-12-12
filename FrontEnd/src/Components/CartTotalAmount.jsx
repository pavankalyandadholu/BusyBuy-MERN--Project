import  { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { notify } from './NotificationComponent'
import { cartSelector } from '../redux/reducers/cartReducer'
import { createOrderAsync } from '../redux/reducers/orderReducer'
const CartTotalAmount = () => {
  const dispatch=useDispatch();
const [sum, setSum] = useState(0)
  const {cart}=useSelector(cartSelector);
  useEffect(()=>{
    let itemsSum=0
    if(cart.length>0){

      cart.map((i)=>itemsSum+=i.itemQuantity*Math.floor(i.productDetails.price*84)); 
      setSum(itemsSum)
    }

  },[cart])

  async function handleSubmitOrder() {
   const result=await dispatch(createOrderAsync())
   if(createOrderAsync.fulfilled.match(result)){
     notify('Successfully Purchased !');
   }
  else{

    notify('Failed to Purchase')
  }
  }
  return (
    <div className='   p-3 pl-8 sm:pl-3 bg-blue-100 rounded-md w-full   sm:w-["100px"] min-w-56 mt-7 '>
    <div className=' m-4 p-3 flex items-center justify-center flex-col gap-5'>

    <h1 className=' text-xl font-medium '>Total Price:- &#8377;{sum}/-</h1>
        <button onClick={handleSubmitOrder} className=' mx-auto border-2 rounded-md bg-blue-500 px-6 py-2'>Purchase</button>
    </div>

</div>
)
}

export default CartTotalAmount