import { FC } from 'react';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
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
import UserProfilePage from '../pages/user/Profile';
import UserSettingsPage from '../pages/user/Settings';
import UserOrdersPage from '../pages/user/Order';
import Products from '../pages/admin/Products';
import Users from '../pages/admin/UsersPage';
import SingleProduct from '../pages/admin/SingleProduct';
import CreateProduct from '../pages/admin/CreateProduct';
import Reports from '../pages/admin/ReportsPage';

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
          <Route path="user" element={<PrimaryLayout>< UserDashboard/></PrimaryLayout>}>
            {/* Nested routes within UserDashboard */}
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="orders" element={<UserOrdersPage />} />
            <Route path="settings" element={<UserSettingsPage />} />
          </Route> 
        </Route>

        <Route path='/dashboard' element={<AdminRoute/>}> 
          <Route path="admin" element={<PrimaryLayout> <AdminDashboard/></PrimaryLayout>}>
            {/* Nested routes within AdminDashboard */}
            <Route path="products" element={<Products />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="product/:id" element={<SingleProduct />} /> 
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterWrapper;