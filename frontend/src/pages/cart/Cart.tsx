import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, server } from '../../services/redux/store';
import { CartItem } from '../../types/reducer-types';
import { addToCart, calculatePrice, discountApplied, saveCouponCode, removeCartItem } from '../../services/redux/reducer/cartReducer';
import axios from 'axios';
import ItemCard from './ItemCard';
import Summary from './Summary';
import { useNavigate, useLocation } from 'react-router-dom';

const Cart: FC = () => { 
  const dispatch = useDispatch(); 
  const {items, subtotal, shippingCharges,tax,total,discount} = useSelector((state:RootState)=>state.cartReducer);
  const isLoggedIn = useSelector((state:RootState)=>state.userReducer.token);
  const [couponCode, setCouponCode] = useState<string>('');
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
 

  const quantityIncreaseHandler = (item:CartItem) => {  
    if(item.quantity >= item.stock) return;
    dispatch(addToCart({...item, quantity: item.quantity + 1}));
  };

  const quantityDecreaseHandler = (item:CartItem) => {
    if(item.quantity <=1) return;
    dispatch(addToCart({...item, quantity:item.quantity - 1}));
  };

  const removeHandler = (productId:string) => {dispatch(removeCartItem(productId))};

  useEffect(() => {
    const {token:cancelToken, cancel} = axios.CancelToken.source();
    const timeOutID = setTimeout(() => {
      axios.get(`${server}/api/v1/coupons/discount?coupon=${couponCode}`,{cancelToken})
      .then((res)=>{ 
        dispatch(discountApplied(res.data.data.discount.amount)); 
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
        dispatch(saveCouponCode(couponCode));
      })
      .catch(()=>{ 
        dispatch(discountApplied(0));
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
        dispatch(saveCouponCode(""));
      })
    }, 1000);
    return ()=>{ 
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    }
  }, [couponCode, dispatch])
  
  useEffect(() => {
    dispatch(calculatePrice());
  }, [dispatch, items])

  // Check if the user is logged in, otherwise redirect to login page
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', {
        state: { from: location }, // This helps to redirect back after login
      });
    }
  }, [isLoggedIn, navigate, location]);
  

 return( 
  <div className='container mx-auto text-center my-10 p-4'> 
    <h1 className='text-2xl font-bold mb-14'>Shopping Cart</h1>
    <div className='flex col-span-2 justify-center items-start  gap-10'>
      <ItemCard 
      items={items} 
      quantityIncreaseHandler={quantityIncreaseHandler}
      quantityDecreaseHandler={quantityDecreaseHandler}
      removeHandler={removeHandler}
      />
      <Summary 
      subtotal={subtotal}
      shippingCharges={shippingCharges}
      tax={tax}
      discount={discount}
      total={total}
      isValidCouponCode={isValidCouponCode}
      setCouponCode={setCouponCode}
      couponCode={couponCode} 
      items={items}
      />
    </div>
  </div>
 );

}

export default Cart;
