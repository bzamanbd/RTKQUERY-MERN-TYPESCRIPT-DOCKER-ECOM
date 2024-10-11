import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, server } from '../../services/redux/store';
import { CartItem } from '../../types/reducer-types';
import { addToCart, calculatePrice, discountApplied, removeCartItem } from '../../services/redux/reducer/cartReducer';
import axios from 'axios';
import ItemCard from './ItemCard';
import Summary from './Summary';

const Cart: FC = () => { 
  const dispatch = useDispatch(); 
  const {items, subtotal, shippingCharges,tax,total,discount} = useSelector((state:RootState)=>state.cartReducer);
  const [couponCode, setCouponCode] = useState<string>('');
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
 

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
      })
      .catch(()=>{ 
        dispatch(discountApplied(0));
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
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
