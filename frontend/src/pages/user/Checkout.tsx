import { FormEvent, useState } from 'react';
import arrowBack from '../../assets/icons/arrow_back_24dp_666666.svg'
import { useBackButtonHandler } from "../../utils/backButtonHandler";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import toast from 'react-hot-toast';
import { useCreateOrderMutation } from '../../services/redux/api/orderApi';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../../services/redux/reducer/cartReducer';

const Checkout = () => {
  const handleBack = useBackButtonHandler();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const {items, couponCode, shippingAddress } = useSelector((state:RootState)=>state.cartReducer);
  const [createOrder, { isLoading, }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({
        shippingAddress,
        orderedItems:items,
        discountCode:couponCode,
      }).unwrap();
      dispatch(resetCart());
      toast.success('Order created successfully!');
      navigate('/dashboard/user/orders');
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error(`${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className='flex items-center mb-10'>
          <button type='button' onClick={handleBack}><img src={arrowBack} alt="arrowback"/></button>
          <h2 className="text-2xl font-bold text-center mx-auto content-center ">Payment</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name='paymentMethod'
              value={paymentMethod}
              onChange={(e)=>setPaymentMethod(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="" disabled>Select payment method</option>
              <option value="Cash On Delivery">Cash On Delivery</option>
              <option value="Bkash">Bkash</option>
            </select>
          </div>
          <button type='submit'
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none translate-x-36">
            {isLoading ? 'Submitting...' : 'Submit Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout

