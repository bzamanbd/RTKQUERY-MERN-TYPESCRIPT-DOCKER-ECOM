import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../vite-env';
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from '../../services/redux/api/productApi';
import toast from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../../types/api-types';
import { server } from '../../services/redux/store';


const SingleProduct:FC = () => { 
  const params = useParams();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);
  const product = data?.data.product; 
  const [updateProduct,{isSuccess}] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<Product>({
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    photos: [],
    videos: [],
  });

  useEffect(() => {
    if (product) {
      setFormState(product);
      setVisiblePhotos(product.photos);
      setVisibleVideos(product.videos);
    }
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  //===========================>Start Photo Handling Part <=============================//
  // Handle existing photos with remove options
  const [visiblePhotos, setVisiblePhotos] = useState(product?.photos); // State to manage photo visibility
  const [photosToRemove, setPhotosToRemove] = useState<string[]>([]);
  // Handle click to remove photo
  const handleRemovePhoto = (photo: string) => {
    // Make photo invisible by removing it from visiblePhotos
    setVisiblePhotos((prev) => prev!.filter((p) => p !== photo));
    // Add photo to photosToRemove list
    setPhotosToRemove((prev) => [...prev, photo]);
  };

  // Handle new photos addition
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null); // For storing error messages related to photos
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

  // Handle removing a new photo from the list
  const handleRemoveNewPhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1); // Remove the photo at the selected index
    setPhotos(updatedPhotos);
  };
//=============================>End Photo Handling Part <========================//

//=============================>Start Video Handling Part <======================//
  // Handle existing photos with remove options
  const [visibleVideos, setVisibleVideos] = useState(product?.videos); // State to manage video visibility
  const [videosToRemove, setVideosToRemove] = useState<string[]>([]);
  // Handle click to remove photo
  const handleRemoveVideo = (video: string) => {
    // Make photo invisible by removing it from visiblePhotos
    setVisibleVideos((prev) => prev!.filter((p) => p !== video));
    // Add photo to photosToRemove list
    setVideosToRemove((prev) => [...prev, video]);
  };

  // Handle new photos addition
  const [videos, setVideos] = useState<File[]>([]);
  const [videoError, setVideoError] = useState<string | null>(null); // For storing error messages related to videos
  const MAX_VIDEO_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  // Handle videos addition
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
      if (files) {
        const validVideos: File[] = [];
        let errorMessage: string | null = null;
    
        Array.from(files).forEach((file) => {
          if (file.size > MAX_VIDEO_SIZE) {
            errorMessage = `File: ${file.name} is too large. Maximum size is 5MB`;
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


  // Handle removing a new photo from the list
  const handleRemoveNewVideo = (index: number) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1); // Remove the video at the selected index
    setVideos(updatedVideos);
  };
//=============================>End Video Handling Part <========================//

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    // Append regular fields
    formData.append('name', formState.name);
    formData.append('description', formState.description);
    formData.append('price', formState.price.toString());
    formData.append('category', formState.category);
    formData.append('stock', formState.stock.toString());
    // Handle photos separately
    photos.forEach(photo=>formData.append(`photos`, photo)) // Append each photo to FormData );
    // Append photosToRemove list to formData
    formData.append('photosToRemove', JSON.stringify(photosToRemove));

    // Handle videos separately
    videos.forEach(video=>formData.append(`videos`, video)) // Append each video to FormData );
    // Append videosToRemove list to formData
    formData.append('videosToRemove', JSON.stringify(videosToRemove));

    const res = await updateProduct({productId:data?.data.product._id, formData}); 
    if ("data" in res && res.data) {
      toast.success(res.data.message);
      navigate("/dashboard/admin/products");
      window.location.reload(); 
    } else {
      const error = res.error as FetchBaseQueryError;
      const messageResponse = error.data as MessageResponse;
      toast.error(messageResponse.message); 
    }
  };

  const deleteProductHandler = async()=>{ 
    if (window.confirm("Are you sure you want to delete this product?")) {
      const res = await deleteProduct({productId:data?.data.product._id});
    if ("data" in res && res.data) {
      toast.success(res.data.message);
      navigate("/dashboard/admin/products");
    } else {
      const error = res.error as FetchBaseQueryError;
      const messageResponse = error.data as MessageResponse;
      toast.error(messageResponse.message); 
    }
    }
  };

  // UseEffect to reload the page after successful image update
  useEffect(() => {
    if (isSuccess && product) {
      window.location.reload(); // Reload the entire page
      setFormState(product);
    }
  }, [isSuccess,product]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product details</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              <div>
              <label className="block text-sm font-medium">Product ID:</label>
                <input
                  value={formState._id}
                  disabled
                  className="block w-full font-bold"
                />
              </div>
            </div>
    
          <form onSubmit={handleSubmit} className="space-y-4">
      
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              
    
              <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formState.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
    
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                rows={4}
              />
            </div>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formState.price}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formState.stock}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            
            {/* Display existing photos with delete button */}
            { 
              visiblePhotos && visiblePhotos.length>0?
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Current Photos</p>
                <div className="grid grid-cols-6 gap-4">
                  { 
                    visiblePhotos.map((photo,idx)=>( 
                      <div key={idx} className='relative'> 
                        <img src={`${server}/${photo}`} alt="Product Photo" className="h-32 w-32 object-cover" />
                        <button type='button' 
                        onClick={() => handleRemovePhoto(photo)}
                        className='absolute top-0 left-0 bg-red-800 text-white px-2'>X</button>
                      </div>
                    ))
                  }
                </div>
              </div> 
              :<div><p className='text-xs'>No photo available</p></div>
            }

        {/* New Photos */}
        <div>
          {photoError && <p className="text-red-500">{photoError}</p>}
          {/* Preview the selected photos */}
          {photos.length > 0 && (
            <div className="mt-4">
              <p className="block text-sm font-medium text-gray-700">New Photos:</p>
              <div className="flex flex-wrap gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(photo)} alt={`Photo ${index + 1}`} 
                    className="w-24 h-24 object-cover border"/>
                    <button type="button" onClick={() => handleRemoveNewPhoto(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2 text-xs">
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
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos(Max 3, Each ≤ 3MB):</label>
          <input type="file" multiple accept="image/*" onChange={handlePhotoChange} disabled={photos.length >=3}/>
        </div>

                    
        {/* Display existing videos with delete button */}
        {visibleVideos && visibleVideos.length>0?
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Current Photos</p>
              <div className="grid grid-cols-6 gap-4">
                {visibleVideos.map((video,idx)=>( 
                  <div key={idx} className='relative'> 
                    <video src={`${server}/${video}`} controls  className="h-32 w-32 object-cover"></video>
                      <button type='button' 
                        onClick={() => handleRemoveVideo(video)}
                        className='absolute top-0 left-0 bg-red-800 text-white px-2'>X
                      </button>
                  </div>
                  ))
                }
              </div>
          </div> 
          :<div><p className='text-xs'>No video available</p></div>
        }
      
        {/* New Videos */}
      <div>

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
                    onClick={() => handleRemoveNewVideo(index)}
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

        <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Video(Max 1, Size ≤ 3MB)</label>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={handleVideoChange}
          disabled={videos.length >= 1}
        />
        {videoError && <p className="text-red-500">{videoError}</p>}
      </div>
        
      <div className='flex justify-between'>
          <button type="submit" 
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                Save Changes
          </button>
          <button type='button'
            onClick={() => deleteProductHandler()}
            className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-900">
                Delete Product
          </button>

      </div>
        
      </form>
    </div>
  );
}

export default SingleProduct
