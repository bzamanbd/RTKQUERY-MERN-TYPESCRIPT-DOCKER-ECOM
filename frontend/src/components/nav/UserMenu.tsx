import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { RootState } from "../../services/redux/store";

const UserMenu:FC = () => {
    const {token,user} = useSelector((state:RootState)=>state.userReducer);
    const location = useLocation();
    const navigate = useNavigate();
    // Automatically navigate to orders when on the dashboard
    useEffect(() => {
      const isUser:boolean = !!user && user.role ==='client' && !!token;
      if (isUser && location.pathname === "/dashboard/user") {
        navigate("orders"); 
      }
    },[token,user,location,navigate]);
    return <> 
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink to="orders" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}>Orders</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="profile" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}>Profile</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="settings" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}>Settings</NavLink>
            </li>

          </ul>
        </nav>
    </>
}

export default UserMenu;
