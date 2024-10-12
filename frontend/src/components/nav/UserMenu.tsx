import { FC } from "react";
import { NavLink } from "react-router-dom"

const UserMenu:FC = () => {
    return <> 
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink to="profile" className="hover:bg-gray-700 p-2 block">Profile</NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="orders" className="hover:bg-gray-700 p-2 block">Orders</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="settings" className="hover:bg-gray-700 p-2 block">Settings</NavLink>
            </li>
          </ul>
        </nav>
    </>
}

export default UserMenu;
