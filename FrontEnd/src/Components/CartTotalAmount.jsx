import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "./NotificationComponent";
import { cartSelector } from "../redux/reducers/cartReducer";
import { createOrderAsync } from "../redux/reducers/orderReducer";
import axios from "axios";

const CartTotalAmount = () => {
  const dispatch = useDispatch();
  const [sum, setSum] = useState(0);
  const { cart } = useSelector(cartSelector);

  useEffect(() => {
    let itemsSum = 0;
    if (cart.length > 0) {
      cart.map((i) => (itemsSum += i.itemQuantity * Math.floor(i.productDetails.price * 84)));
      setSum(itemsSum);
    }
  }, [cart]);

  // Function to load the Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  async function handleSubmitOrder() {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      notify("Failed to load Razorpay. Please check your internet connection.");
      return;
    }

    try {
      // Request order creation from the backend
      const { data } = await axios.post("http://localhost:5000/create-order", { amount: sum });
      
      const options = {
        key: import.meta.env.VITE_REACT_APP_KEY_ID, // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: "INR",
        name: "E-Commerce Store",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          // Send response to backend for verification
          const verifyRes = await axios.post("http://localhost:5000/verify-payment", response);

          if (verifyRes.data.success) {
            notify("Payment Successful! Processing your order...");
            const result = await dispatch(createOrderAsync());
            if (createOrderAsync.fulfilled.match(result)) {
              notify("Successfully Purchased!");
            } else {
              notify("Failed to complete the order.");
            }
          } else {
            notify("Payment verification failed.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      notify("Payment failed. Please try again.");
    }
  }

  return (
    <div className="p-3 pl-8 sm:pl-3 bg-blue-100 rounded-md w-full sm:w-['100px'] min-w-56 mt-7">
      <div className="m-4 p-3 flex items-center justify-center flex-col gap-5">
        <h1 className="text-xl font-medium">Total Price: ₹{sum}/-</h1>
        <button onClick={handleSubmitOrder} className="mx-auto border-2 rounded-md bg-blue-500 px-6 py-2">
          Purchase
        </button>
      </div>
    </div>
  );
};

export default CartTotalAmount;
