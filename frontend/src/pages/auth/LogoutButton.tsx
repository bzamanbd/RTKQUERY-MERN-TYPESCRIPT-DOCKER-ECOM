// src/components/LogoutButton.tsx
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userNotExist } from '../../services/redux/reducer/userReducer';

const LogoutButton: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=>{ 
    localStorage.removeItem('auth'); 
    dispatch(userNotExist()); 
    navigate('/login');
  }
  return <button className='text-gray-300 hover:text-gray-50' onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
