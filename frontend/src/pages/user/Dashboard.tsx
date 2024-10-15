import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import UserMenu from '../../components/nav/UserMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';

const UserDashboard: FC = () => {
  const {user} = useSelector((state:RootState)=>state.userReducer);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-4">{`Hi ${user?.name}`}</h2>
        <p className='text-xs font-thin mb-6'>{`${user?.email}`}</p>
        <UserMenu/>        
      </aside>

      {/* Main content area */}
      <div className="flex-1 p-5 bg-gray-100">
        <Outlet/> {/* Renders the selected admin route */}
      </div>
    </div>
  );
};

export default UserDashboard;
