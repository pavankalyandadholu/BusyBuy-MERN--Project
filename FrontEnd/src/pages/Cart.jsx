import AllCartCards from '../Components/AllCartCards'
import CartTotalAmount from '../Components/CartTotalAmount';

const Cart = () => {
    
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