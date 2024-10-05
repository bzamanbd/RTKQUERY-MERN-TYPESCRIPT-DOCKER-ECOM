import { FC, useEffect,  } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate,  } from "react-router-dom"
import { RootState } from "../../services/redux/store";

const AdminMenu:FC = () => {
  const {token,user} = useSelector((state:RootState)=>state.userReducer);
  const location = useLocation();
  const navigate = useNavigate();
  // Automatically navigate to Products when on the dashboard
  useEffect(() => {
    const isAdmin:boolean = !!user && user.role ==='admin' && !!token;
    if (isAdmin && location.pathname === "/dashboard/admin") {
      navigate("products"); 
    }
  },[token,user,location,navigate]);
    return <> 
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink to="products" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}>Products</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="create-product" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}  >Create Product</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="users" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"} >Users</NavLink>
            </li>


            <li className="mb-2">
              <NavLink to="reports" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}  >Reports</NavLink>
            </li>
          </ul>
        </nav>
    </>
}

export default AdminMenu;
