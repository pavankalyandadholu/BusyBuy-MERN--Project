
import AllProductCards from '../Components/AllProductCards';
import Filters from '../Components/Filters';
const Home = () => {
  
  
  return (
    <> 
   
    <div className=' mt-6 flex items-center justify-center'>
      <form >
        <input className=' w-96 p-2 border-2 outline-none rounded-md text-lg placeholder:text-lg' type="text" name="productName" id="productName" placeholder='Search By Name'  />
      </form>
    </div>
    
    <div className='  flex flex-col sm:flex-row items-start justify-center gap-5'>
      <Filters/>

    <AllProductCards/>
    </div>
    </>
  )
}

export default Home