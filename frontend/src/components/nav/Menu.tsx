import { Link, NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="bg-blue-700 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src="/logo/logo2.png" alt="logo" className="h-16 w-16" />
            <span className="text-gray-300 text-xl font-bold">My Shop</span>
          </div>
        </Link>
        {/* Menu */}
        <ul className="flex space-x-4">
          <li>
          
          <NavLink
            to="/" className= {({isActive})=>`px-4 py-2 ${isActive? 'text-gray-800 bg-gray-200 rounded-md' : 'text-gray-300'}`}
          >
            Home
          </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className= {({isActive})=>`px-4 py-2 ${isActive? 'text-gray-800 bg-gray-200 rounded-md' : 'text-gray-300'}`} >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className= {({isActive})=>`px-4 py-2 ${isActive? 'text-gray-800 bg-gray-200 rounded-md' : 'text-gray-300'}`} >
              Register
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" className= {({isActive})=>`px-4 py-2 ${isActive? 'text-gray-800 bg-gray-200 rounded-md' : 'text-gray-300'}`} >
              Login
            </NavLink>
          </li>

          <li>
            <NavLink to="/cart" className= {({isActive})=>`px-4 py-2 ${isActive? 'text-gray-800 bg-gray-200 rounded-md' : 'text-gray-300'}`}>
              Cart
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard" className= {({isActive})=>`px-4 py-2 ${isActive? 'text-gray-800 bg-gray-200 rounded-md' : 'text-gray-300'}`}>
              Dashboard
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Menu;
