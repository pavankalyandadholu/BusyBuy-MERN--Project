const OrdersComponent = ({orders}) => {
    return (
    <div className=" flex items-center flex-col justify-center gap-4 mt-6"> 
        <div>
<h1 className=" text-xl font-medium">
Ordered On:- {orders.date}
</h1>
        </div>
        <div>
          <table   className=" text-center overflow-auto ">
            <thead  >
              <tr  className=" bg-gray-200">
                <td  className=" px-4 py-2 text-left text-gray-600 font-bold uppercase border-b-2 border-black">Title</td>
                <td className=" px-4 py-2 text-left text-gray-600 font-bold uppercase border-b-2 border-black">Price</td>
                <td className=" px-4 py-2 text-left text-gray-600 font-bold uppercase border-b-2 border-black">Quantity</td>
                <td className=" px-4 py-2 text-left text-gray-600 font-bold uppercase border-b-2 border-black">Total Amount</td>
              </tr>
            </thead>
            <tbody>
            { 
              orders.orders.map((o,i)=>
                <tr key={i} className="border-b hover:bg-gray-100">
                <td className=" px-4 py-3">
                {o.title.slice(0,20)}
                </td>
                <td className=" px-4 py-3">
                ₹ {Math.floor(o.price*84)}
                </td>
                <td className=" px-4 py-3">
                {o.itemsCount}
                </td>
                <td className=" px-4 py-3">
                ₹ {Math.floor(o.price*o.itemsCount*84)}
                </td>
              </tr>
              )
              }
              
            </tbody>
          </table>
        </div>
    </div>
 
  )
}

export default OrdersComponent