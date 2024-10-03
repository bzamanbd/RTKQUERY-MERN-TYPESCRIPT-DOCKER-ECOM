import { FC, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"

const AdminMenu:FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Automatically navigate to Products when on the dashboard
  useEffect(() => {
    if (location.pathname === "/dashboard/admin") {
      navigate("/admin/products");
    }
  },[location, navigate]);
    return <> 
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink to="/admin/products" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}>Products</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/admin/create-product" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}  >Create Product</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/admin/users" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"} >Users</NavLink>
            </li>


            <li className="mb-2">
              <NavLink to="/admin/reports" className={({ isActive }) => isActive ? "text-blue-400 font-bold underline bg-gray-700 p-2 block" : "text-gray-200 hover:bg-gray-700 p-2 block"}  >Reports</NavLink>
            </li>
          </ul>
        </nav>
    </>
}

export default AdminMenu;
