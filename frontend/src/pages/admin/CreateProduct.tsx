
import {FC, FormEvent, useState } from 'react';
import { useCreateProductMutation } from '../../services/redux/api/productApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../../types/api-types';

const CreateProduct: FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(100);
  const [stock, setStock] = useState<number>(1);
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [videos, setVideos] = useState<FileList | null>(null);
  const [createProduct, {isLoading}] = useCreateProductMutation();
  const navigate = useNavigate();
  
  const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData();
    if(!name || !description || !category || !price || stock<0 )return; 
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString()); 
    // Handle photos separately
    if (photos) { Array.from(photos).forEach(photo=>formData.append(`photos`, photo))}
    // Handle videos separately
    if (videos) { Array.from(videos).forEach(video=>formData.append(`videos`, video))}

    const res = await createProduct(formData); 
    if ("data" in res && res.data) {
      toast.success(res.data.message);
      navigate("/admin/products");
    } else {
      const error = res.error as FetchBaseQueryError;
      const messageResponse = error.data as MessageResponse;
      toast.error(messageResponse.message); 
    }
  }
  return (
    <div className="max-w-2xl  p-8 ">
      <h2 className="text-2xl font-semibold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            id="name"
            type='text'
            placeholder='Enter product name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500 `}
            required
          />
          
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description} 
            onChange={(e)=>setDescription(e.target.value)}
            placeholder='Enter the description of product here'
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500`}
          />
          
        </div>
        
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            id="category"
            type='text'
            placeholder='Enter product category name'
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500 `}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            type="number" 
            value={price}
            onChange={(e)=>setPrice(parseFloat(e.target.value))}
            placeholder='Enter the price of the product'
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500`}
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            id="stock"
            type="number"
            value={stock} 
            onChange={(e)=>setStock(Number(e.target.value))}
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500`}
            placeholder='Enter the stock quantity of the product'
            required
          />
        </div>

        {/* Photos */}
        <div>
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos</label>
          <input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            // onChange={handlePhotoChange}
            onChange={(e) => setPhotos(e.target.files)}
            className="mt-1 block w-full"
          />
        </div>

        {/* Videos */}
        <div>
          <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Videos</label>
          <input
            id="videos"
            type="file"
            multiple
            accept="video/*"
            // onChange={handleVideoChange}
            onChange={(e) => setVideos(e.target.files)}
            className="mt-1 block w-full"
          />
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
