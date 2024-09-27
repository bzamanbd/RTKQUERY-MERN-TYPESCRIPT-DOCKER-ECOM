import { FC } from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PrimaryLayout from '../components/layouts/PrimaryLayout';
import SecondaryLayout from '../components/layouts/SecondaryLayout';
import { Toaster } from 'react-hot-toast';

const RouterWrapper: FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{style: {background:'#4CAF50',color:'#FFFFFF'},duration:5000}}/>
      <Routes>
        <Route path="/" element={<PrimaryLayout><Home /></PrimaryLayout>} />
        <Route path="/register" element={<SecondaryLayout><Register /></SecondaryLayout>} />
        <Route path="/login" element={<SecondaryLayout><Login /></SecondaryLayout>} />
        <Route path="/shop" element={<SecondaryLayout><Shop /></SecondaryLayout>} />
        <Route path="/cart" element={<><Cart /></>} />
        <Route path="/dashboard" element={<PrimaryLayout><Dashboard /></PrimaryLayout>} />
        {/* 404 route */}
        <Route path="*" element={<PrimaryLayout><NotFound /></PrimaryLayout>} />
      </Routes>
      
    </BrowserRouter>
  );
};

export default RouterWrapper;