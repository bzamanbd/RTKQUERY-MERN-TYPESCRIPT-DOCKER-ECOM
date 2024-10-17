import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useRegisterMutation } from '../../services/redux/api/authApi';
import toast from 'react-hot-toast';
import { userExist, userNotExist } from '../../services/redux/reducer/userReducer';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from 'react-router-dom';

const Register: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    question: '',
    answer: '',
    avatar: '',
  });
  const [register,{isLoading}] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(formData);
      console.log("Res====>", result);
      if("data" in result){ 
        const userData = result.data?.data.user;
        const token = result.data?.data.token;
        if(userData){
          toast.success('Login success');
          localStorage.setItem('auth', JSON.stringify({user:userData, token}));
          dispatch(userExist({user: userData, token:''})); 
          setFormData({ 
            name: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            question: '',
            answer: '',
            avatar: '',
          });
          navigate('/');
        }else{ 
          toast.error('Invalid response data')
        }
      }else{
        // if the response does not contain 'data' because of an error
        // This is a FetchBaseQueryError
        const err = result.error as FetchBaseQueryError & {data?: {error?:string}};
        const errStatus = err.status; // e.g., 401 Unauthorized
        let errMessage;
        // Check if error.data is an object and has a message
        if(typeof err.data === 'object' && 'message' in err.data){
          errMessage = err.data.message; // Accessing message field
          } else if(typeof err.data === 'object' && 'error' in err.data){
            errMessage = err.data.error; // Accessing error field
            } else if(typeof err.data === 'string'){
              errMessage = err.data; // If it's just a string  
              }
              toast.error(`${errMessage} | status: ${errStatus}` as string || 'An unexpected error occurred');
              dispatch(userNotExist());
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Security Question */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="securityQuestion">
              Security Question
            </label>
            <select
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Select a security question</option>
              <option value="What was your childhood nickname?">What was your childhood nickname?</option>
              <option value="What is the name of your favorite childhood friend?">
                What is the name of your favorite childhood friend?
              </option>
              <option value="What was your first pet’s name?">What was your first pet’s name?</option>
            </select>
          </div>

          {/* Answer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="answer">
              Answer
            </label>
            <input
              id="answer"
              name="answer"
              type="text"
              value={formData.answer}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Avatar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="avatar">
              Avatar
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              onChange={(e) => setFormData({ ...formData, avatar: e.target.files![0].name})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>

          {/* Forgot Password and Login Link */}
          <div className="flex justify-between">
            <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
            <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
              Have an account? Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
