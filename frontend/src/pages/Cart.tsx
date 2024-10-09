import { FC, useState } from 'react';

const Cart: FC = () => {
  const [couponCode, setCouponCode] = useState('');
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      quantity: 1,
    },
  ]);

  const shippingCharges = 5.00;
  const taxRate = 0.1; // 10% tax
  const discount = 0; // Placeholder for discount
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCharges + tax - discount;

  const handleDelete = (id:number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleIncreaseQuantity = (id:number) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id:number) => {
    setItems(
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleApplyCoupon = () => {
    // Logic to apply coupon code
    alert(`Coupon code "${couponCode}" applied!`);
    setCouponCode('');
  };

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className='flex col-span-2 justify-center items-center gap-4'> 
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 text-white bg-gray-500 rounded"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="px-2 py-1 text-white bg-gray-500 rounded"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    className="text-red-600 hover:text-red-900" 
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold">Summary</h2>
        <div className="flex justify-between mt-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Shipping Charges:</span>
          <span>${shippingCharges.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Discount:</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <input 
          type="text" 
          value={couponCode} 
          onChange={(e) => setCouponCode(e.target.value)} 
          placeholder="Coupon Code" 
          className="border border-gray-300 px-4 py-2 rounded mr-2"
        />
        <button 
          onClick={handleApplyCoupon} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>

      <div className="mt-6">
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
      
      </div>
      

      
    </div>
  );
};

export default Cart;
