import { FC } from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PrimaryLayout from '../components/layouts/PrimaryLayout';
import SecondaryLayout from '../components/layouts/SecondaryLayout';
import { Toaster } from 'react-hot-toast';
import PrivateRoutes from '../components/routes/PrivateRoutes';
import UserDashboard from '../pages/user/Dashboard';
import AdminRoute from '../components/routes/AdminRoute';
import AdminDashboard from '../pages/admin/Dashboard';
import UsersPage from '../pages/UsersPage';
import ProductsPage from '../pages/ProductsPage';
import ReportsPage from '../pages/ReportsPage';

const RouterWrapper: FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{style: {background:'#4CAF50',color:'#FFFFFF'},duration:5000}}/>
      
      <Routes>
        <Route path="/" element={<PrimaryLayout><Home /></PrimaryLayout>} />
        <Route path="/register" element={<SecondaryLayout><Register /></SecondaryLayout>} />
        <Route path="/login" element={<SecondaryLayout><Login /></SecondaryLayout>} />
        <Route path="/shop" element={<SecondaryLayout><Shop /></SecondaryLayout>} />
        <Route path="/cart" element={<SecondaryLayout><Cart /></SecondaryLayout>} />
        {/* 404 route */}
        <Route path="*" element={<PrimaryLayout><NotFound /></PrimaryLayout>} />
        
        <Route path='/dashboard' element={<PrivateRoutes/>}> 
          <Route path='user' element={<PrimaryLayout>< UserDashboard/></PrimaryLayout>}/>
        </Route>

        <Route path='/dashboard' element={<AdminRoute/>}> 
          <Route path='admin' element={<PrimaryLayout> <AdminDashboard/></PrimaryLayout>}/>  
        </Route>

        {/* routing of admin dashboard sidebar menu */}
        <Route path='/admin' element={<PrimaryLayout> <AdminDashboard/></PrimaryLayout>}> 
          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default RouterWrapper;