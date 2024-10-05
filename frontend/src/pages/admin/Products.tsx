import { FC } from 'react';
import { Link } from 'react-router-dom'; // For action buttons like Edit/Delete
import { Product } from '../../vite-env';
import { useAllProductsQuery } from '../../services/redux/api/productApi';
import { server } from '../../services/redux/store';
import actionIcon from '../../assets/icons/action-visibility.svg';

const Products: FC = () => {
  const { data, isLoading, isError } = useAllProductsQuery("");
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data || !data.data.products) return <div>Error fetching products</div>; 
  const products:Product[] = data.data.products;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">Photo</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: Product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50"> 
              <td className="px-4 py-2">
                {product.photos && product.photos.length>0?(<img src={`${server}/${product.photos[0]}`} alt={product.name} className="w-16 h-16 object-cover rounded" />) : (<div>No Photo Available</div>)}
              </td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">${product.price.toFixed(2)}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">
                <Link to={`/dashboard/admin/product/${product._id}`} className="text-blue-500 hover:underline">
                <img src={actionIcon} alt="action-icon"/>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
