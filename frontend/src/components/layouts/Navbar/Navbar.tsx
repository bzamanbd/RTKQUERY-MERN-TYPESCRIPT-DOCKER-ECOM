import Logo from "../../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { FC } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { BsArrowLeftRight } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import MenuIcon from '../../../assets/header/menu.svg'
import { NavLink } from "react-router-dom";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Top Rated",
    link: "/#services",
  },
  {
    id: 3,
    name: "Kids Wear",
    link: "/#",
  },
  {
    id: 3,
    name: "Mens Wear",
    link: "/#",
  }
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];

const phoneNumber = '+8801971556799';
const facebookUrl = 'https://www.facebook.com';
const youtubeUrl = 'https://www.youtube.com';

interface NavbarProps { handleOrderPopup: ()=> void}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className=" bg-white font-nav tracking-wide  text-gray-700  border-b-1 border-gray-200 dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* top bar */}
      <div className="bg-primary text-white text-[12px] py-2 "> 
        <div className="container flex justify-between items-center"> 
          <div className="flex items-center gap-2"> 
            <span><FaPhoneAlt /></span>
            <span>{phoneNumber}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <FaFacebookF size=".8rem" className=" hover:text-gray-300" />
            </a>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <FaYoutube size=".8rem" className=" hover:text-gray-300" />
            </a>
            <div className="border-l-2 border-white/40 px-1 hover:text-gray-300"> 
              <NavLink to="/">
                FAQS
              </NavLink>
            </div>
          </div> 
        </div>
      </div>

      {/* middle bar logo, search & login section */}
      <div className="middleBar border-b-1 border-gray-200 py-10">
        <div className="container flex items-center justify-between">
          <div className="logo">
          <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2 text-gray-700">
              <img src={Logo} alt="Logo" className="w-10" />
              JesFashion
            </a>
          </div>
          <div className="search">
            <div className="relative">
              <input type="text" placeholder="search"
                className="w-[500px] rounded-full border border-gray-300 text-gray-500 pl-6 pr-12  py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3"/>
            </div>
          </div>

          <div className="login">
            <div className="flex justify-between items-center gap-3">
              {/* order button */}
              <NavLink to="/" className="text-xs font-semibold text-gray-700  hover:text-primary">
                LOGIN / REGISTER 
              </NavLink>
              <NavLink to="/" className="text-xs font-semibold text-gray-700  hover:text-primary">
                <BsHeart size="1.2rem" />
              </NavLink>
              <NavLink to="/" className="text-xs font-semibold text-gray-700  hover:text-primary">
                <BsArrowLeftRight size="1.2rem" />
              </NavLink>
              <NavLink to="/" className="text-xs font-semibold text-gray-700  hover:text-primary">
                <BsBag size="1.2rem" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* lower bar with categories & Navbar */}
      <div className="lowerBar container  flex items-center justify-start gap-12 font-nav text-[13px] uppercase">
        <div className="flex items-center justify-between gap-8 bg-primary py-4 px-4 text-white">
          <div className="cat flex items-center gap-2"> 
            <img src={MenuIcon} alt="" width={23}/>
            <span className="uppercase">Browse Categories</span>
          </div>
          <div className="rIcon">
            <span>
            <BsChevronDown size='14px' />
            </span>
          </div>
        </div>

        <div data-aos="zoom-in" className="flex justify-center font-semibold">
          <ul className="sm:flex hidden items-center gap-4">
            {Menu.map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  className="inline-block px-4 hover:text-primary duration-200 "
                >
                  {data.name}
                </a>
              </li>
            ))}
            {/* Simple Dropdown and Links */}
            <li className="group relative cursor-pointer">
              <a href="#" className="flex items-center gap-[2px] py-2">
                Trending Products
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </a>
              <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {DropdownLinks.map((data) => (
                    <li key={data.id} className="text-gray-700">
                      <a
                        href={data.link}
                        className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                      >
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;