import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from '../../components/nav/AdminMenu';

const AdminDashboard: FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <AdminMenu/>        
      </aside>

      {/* Main content area */}
      <div className="flex-1 p-5 bg-gray-100 ">
        <Outlet/> {/* Renders the selected admin route */}
      </div>
    </div>
  );
};

export default AdminDashboard;
