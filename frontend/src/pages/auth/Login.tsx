import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useLoginMutation } from "../../services/redux/api/userApi";
import toast from "react-hot-toast";
import { userExist, userNotExist } from "../../services/redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate, useLocation } from "react-router-dom";

const Login: FC = () => { 
  const [formData, setFormData] = useState({ email: '', password: ''});
  const [login,{isLoading}] = useLoginMutation();
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{ 
    const {name, value} = e.target;
    console.log(name);
    console.log(value);
      
    setFormData((prevFormData)=>({ 
      ...prevFormData,
      [name]: value || ""
    }));
  }
  const handleSubmit = async(e:FormEvent)=>{ 
    e.preventDefault();
    try {
      const result = await login(formData);
      console.log("res====>", result); 
      if("data" in result){ 
        const userData = result.data?.data.user;
        const token = result.data?.data.token;
        if(userData && token){
          toast.success('Login success');
          localStorage.setItem('auth', JSON.stringify({user:userData, token}));
          dispatch(userExist({user: userData, token}));
          setFormData({ email: '', password: ''});
          const redirectTo = location.state?.from?.pathname ? location.state.from.pathname : `/dashboard/${userData.role === 'admin'? 'admin' : 'user'}`;
          // navigate(`/dashboard/${userData.role === 'admin'? 'admin' : 'user'}`);
          navigate(redirectTo);
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
      console.log("Error during submission:", err);
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Log in</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className= "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="you@example.com" 
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange} 
              required
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div>
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {/* <pre>{JSON.stringify(formData, null, 4)}</pre> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
