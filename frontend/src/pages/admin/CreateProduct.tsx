
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FC, useState } from 'react';

// Define the form input types (excluding photos and videos)
interface IFormInput {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

// Form validation schema
const schema = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().positive().required('Price is required'),
  category: yup.string().required('Category is required'),
  stock: yup.number().min(0, 'Stock must be at least 0').required('Stock is required'),
}).required();

const CreateProduct: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  // State for managing files separately
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [videos, setVideos] = useState<FileList | null>(null);

  // File handlers for photos and videos
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(e.target.files);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos(e.target.files);
    }
  };

  // Function called when the form is submitted
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Handle form fields (excluding files)
    console.log('Form Data:', data);

    // Handle photos separately
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        console.log('Photo File:', photos[i]);
        // You can append to FormData or upload the file here
      }
    }

    // Handle videos separately
    if (videos) {
      for (let i = 0; i < videos.length; i++) {
        console.log('Video File:', videos[i]);
        // You can append to FormData or upload the file here
      }
    }

    // Proceed with submission (e.g., send data to server)
  };

  return (
    <div className="max-w-2xl  p-8 ">
      <h2 className="text-2xl font-semibold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            id="name"
            {...register('name')}
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
            placeholder='Enter product name'
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description')}
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
            placeholder='Enter the description of product here'
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price')}
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500 sm:text-sm ${errors.price ? 'border-red-500' : ''}`}
            placeholder='Enter the price of the product'
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>

        {/* Photos */}
        <div>
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos</label>
          <input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
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
            onChange={handleVideoChange}
            className="mt-1 block w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            {...register('category')}
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500 sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            id="stock"
            type="number"
            {...register('stock')}
            className={`mt-1 block w-full rounded-sm px-2 py-2 border border-gray-300 focus:outline-none   focus:border-blue-500 sm:text-sm ${errors.stock ? 'border-red-500' : ''}`}
            placeholder='Enter the stock quantity of the product'
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
