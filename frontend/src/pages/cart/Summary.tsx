import { FC } from 'react'
import { CartItem } from '../../types/reducer-types';
import { Link } from 'react-router-dom';

type SummaryProps = {
    subtotal: number;
    shippingCharges: number;
    tax: number;
    discount: number;
    total: number;
    isValidCouponCode: boolean;
    couponCode: string;
    setCouponCode: (e:string) => void;
    items: CartItem[];
};

const Summary: FC<SummaryProps> = ({ 
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    isValidCouponCode,
    setCouponCode,
    couponCode,
    items
}) => {
    return (
        <div className='shadow-xl border p-6'> 
            <h2 className="text-lg font-bold text-left ">Summary</h2> 

            <div className="flex justify-between mt-2 items-center gap-20">
                <span>Subtotal:</span>
                <span>{items.length>0 &&`${subtotal.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between mt-2 items-center gap-20">
                <span>Shipping Charges:</span>
                <span>{items.length>0 &&`${shippingCharges.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between mt-2 items-center gap-20">
                <span>Tax:</span>
                <span>{items.length>0 && `${tax.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between mt-2 items-center gap-20">
                <span>Discount:</span>
                <span>{items.length>0 &&`${discount.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between mt-2 items-center gap-20 font-bold">
                <span>Total:</span>
                <span>{items.length>0 &&`${total.toFixed(2)}`}</span>
            </div>

            <div className="mt-6 mb-2">
                <input type="text" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)} 
                placeholder="Coupon Code"
                className="border border-gray-300 px-4 py-2 rounded mr-2"
                disabled= {items.length < 1}
                />
            </div>
            { couponCode && 
                (isValidCouponCode? <span className='text-green-800'>${discount} off using <code>{couponCode}</code></span>:<><span className='text-red-800'>Invalid coupon code</span></> )
            }
            { 
                items.length>0 && 
                <Link to={"/dashboard/user/shipping"}> 
                    <div className="mt-6 text-center">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
                            Checkout
                        </button>
                    </div>
                </Link>
            }
            
        </div> 
    );
}

export default Summary
