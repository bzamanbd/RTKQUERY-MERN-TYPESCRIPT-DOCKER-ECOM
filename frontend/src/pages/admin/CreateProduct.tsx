import {ChangeEvent, FC, FormEvent, useState } from 'react';
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
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null); // For storing error messages related to photos
  const [videoError, setVideoError] = useState<string | null>(null); // For storing error messages related to videos
  const [createProduct, {isLoading}] = useCreateProductMutation();
  // Handle photos addition
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
  const handlePhotoChange = (e:ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validPhotos: File[] = [];
      let errorMessage: string | null = null;

      Array.from(files).forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          errorMessage = `File: ${file.name} is too large. Maximum size is 3MB`;
        } else {
          validPhotos.push(file);
        }
      });

      if (photos.length + validPhotos.length > 3) {
        errorMessage = 'You can only upload a maximum of 3 photos';
      }

      if (errorMessage) {
        setPhotoError(errorMessage);
      } else {
        setPhotoError(null);
        setPhotos([...photos, ...validPhotos]);
      }
    }
  };

  // Handle removing a photo from the list
  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1); // Remove the photo at the selected index
    setPhotos(updatedPhotos);
  };

  // Handle videos addition
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validVideos: File[] = [];
      let errorMessage: string | null = null;
  
      Array.from(files).forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          errorMessage = `File: ${file.name} is too large. Maximum size is 3MB`;
        } else {
          validVideos.push(file);
        }
      });
  
      if (videos.length + validVideos.length > 1) {
        errorMessage = 'You can only upload a maximum of 1 video';
      }
  
      if (errorMessage) {
        setVideoError(errorMessage);
      } else {
        setVideoError(null);
        setVideos([...videos, ...validVideos]);
      }
    }
  };

  // Handle removing a video from the list
  const handleRemoveVideo = (index: number) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

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
    photos.forEach(photo=>formData.append(`photos`, photo)) // Append each photo to FormData );
    // Handle videos separately
    videos.forEach(video=>formData.append(`videos`, video)) // Append each video to FormData );

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
    <div className="max-w-2xl  p-8 h-auto">
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
        <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos(Max 3, Each ≤ 3MB):</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoChange} 
          disabled={photos.length >=3}
        />
         {photoError && <p className="text-red-500">{photoError}</p>}
        {/* Preview the selected photos */}
        {photos.length > 0 && (
          <div className="mt-4">
            <p className="block text-sm font-medium text-gray-700">Photos Preview:</p>
            <div className="flex flex-wrap gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    className="w-24 h-24 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {photos.length >= 3 && (
          <p className="text-red-500 text-xs">You have reached the maximum of 3 photos</p>
        )}
      </div>

      {/* Videos */}
      <div>
      <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Video(Max 1, Size ≤ 3MB)</label>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={handleVideoChange}
          disabled={videos.length >= 1}
        />
         {videoError && <p className="text-red-500">{videoError}</p>}
        {videos.length > 0 && (
          <div className="mt-4">
            <p className="block text-sm font-medium text-gray-700">Video Preview:</p>
            <div className="flex flex-wrap gap-4">
              {videos.map((video, index) => (
                <div key={index} className="relative">
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-24 h-24 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {videos.length >= 1 && (
          <p className="text-red-500 text-xs">You have reached the maximum of 1 video</p>
        )}
      </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:text-gray-500"
          disabled={isLoading || !!photoError || !!videoError}
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
