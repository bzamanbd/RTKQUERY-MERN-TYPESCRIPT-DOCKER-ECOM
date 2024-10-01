import { FC } from "react";
import { NavLink } from "react-router-dom"

const AdminMenu:FC = () => {
    return <> 
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink to="/admin/users" className="hover:bg-gray-700 p-2 block">Users</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/admin/create-product" className="hover:bg-gray-700 p-2 block">Create Product</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/admin/products" className="hover:bg-gray-700 p-2 block">Products</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/admin/reports" className="hover:bg-gray-700 p-2 block">Reports</NavLink>
            </li>
          </ul>
        </nav>
    </>
}

export default AdminMenu;
