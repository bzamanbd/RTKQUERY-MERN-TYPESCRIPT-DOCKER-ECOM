import  { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import arrowBack from '../../assets/icons/arrow_back_24dp_666666.svg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import { useNavigate } from 'react-router-dom';
import { ShippingAddress } from '../../types/reducer-types';
import { saveShippingAddress } from '../../services/redux/reducer/cartReducer';
import toast from 'react-hot-toast';
import { useBackButtonHandler } from '../../utils/backButtonHandler';


const UserShippingAddressPage: React.FC = () => { 
  const {items, couponCode } = useSelector((state:RootState)=>state.cartReducer);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const handleBack = useBackButtonHandler();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({ 
    address:"", city:"", state:"", country:"", postCode:""
  });
  const [countries, setCountries] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countryNames = data.map((country: any) => country.name.common);
        setCountries(countryNames.sort());
      })
      .catch((error) => console.error('Error fetching country list:', error));
  }, []);

  const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      dispatch(saveShippingAddress(shippingAddress));
      navigate('/dashboard/user/pay')
    } catch (err) {
      toast.error(`${err}`);
    }
  }

  useEffect(() => {if(items.length <= 0)navigate('/cart')})
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className='flex items-center mb-10'>
          <button type='button' onClick={handleBack}><img src={arrowBack} alt="arrowback"/></button>
          <h2 className="text-2xl font-bold text-center mx-auto content-center ">Shipping Address</h2>
        </div>
        
        <form onSubmit={submitHandler}>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address" 
              name='address'
              value={shippingAddress.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name='city'
              value={shippingAddress.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your city"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name='state'
              value={shippingAddress.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your state"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              name='country'
              value={shippingAddress.country}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="" disabled>Select your country</option>
              { 
                countries.map((countryName)=>( 
                  <option key={countryName} value={countryName}>{countryName}</option>
                ))
              }
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="postCode" className="block text-sm font-medium text-gray-700">
            PostCode
            </label>
            <input
              type="number"
              id="postCode"
              name='postCode'
              value={shippingAddress.postCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your postcode"
            />
          </div>

          <button type='submit'
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none translate-x-36">
            Pay Now
          </button>

          <pre>{JSON.stringify(shippingAddress, null,4)}</pre>
          <pre>{JSON.stringify(items, null,4)}</pre>
          <pre>{JSON.stringify(couponCode, null,4)}</pre>

        </form>
      </div>
    </div>
  );
};

export default UserShippingAddressPage;


