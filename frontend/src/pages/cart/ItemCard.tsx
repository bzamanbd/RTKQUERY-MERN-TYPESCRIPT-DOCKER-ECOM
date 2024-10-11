import { FC } from 'react'
import { CartItem } from '../../types/reducer-types';
import { server } from '../../services/redux/store';


type ItemCardProps = {
    items: CartItem[];
    quantityIncreaseHandler: (item:CartItem) => void;
    quantityDecreaseHandler: (item:CartItem) => void;
    removeHandler: (productId:string) => void;
};

const ItemCard: FC<ItemCardProps> = ({
    items,
    quantityIncreaseHandler,
    quantityDecreaseHandler,
    removeHandler
 }) => {
  return ( 
    <div className='shadow-xl border'>
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

            { 
                items.length >0 ?
                items.map((item, idx)=>
                    <tbody key={idx} className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={`${server}/${item.photo}`} alt={item.name} className="h-36 object-cover" /> 
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex items-center">
                                    <button className="px-2 py-1 text-white bg-gray-500 rounded"
                                        onClick={() => quantityDecreaseHandler(item)}
                                    >
                                    -
                                    </button>
                                    <span className="mx-2 min-w-4">{item.quantity}</span>
                                    <button
                                    className="px-2 py-1 text-white bg-gray-500 rounded"
                                    onClick={() => quantityIncreaseHandler(item)}
                                    >
                                    +
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> ${(item.price * item.quantity).toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-red-600 hover:text-red-900" onClick={() => removeHandler(item.productId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                ): <tbody className='h-[23rem] flex justify-center items-center'>
                        <span className='translate-x-60'>No item selected</span> 
                    </tbody> 
            }

        </table>
    </div>
  );
}

export default ItemCard

