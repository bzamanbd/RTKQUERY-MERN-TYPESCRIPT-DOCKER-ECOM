import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image1 from "../../../src/assets/hero/women.png";
import Image2 from "../../../src/assets/hero/sale.png";
import Image3 from "../../../src/assets/hero/shopping.png";
import furniture from "../../../src/assets/hero/furniture.svg";
import cooking from "../../../src/assets/hero/cooking.svg";
import accessories from "../../../src/assets/hero/accessories.svg";
import fashion from "../../../src/assets/hero/fashion.svg";
import clocks from "../../../src/assets/hero/clocks.svg";
import lighting from "../../../src/assets/hero/lighting.svg";
import toys from "../../../src/assets/hero/toys.svg";
import minimalism from "../../../src/assets/hero/minimalism.svg";
import handMade from "../../../src/assets/hero/hand-made.svg";
import electronics from "../../../src/assets/hero/electronics.svg";
import cars from "../../../src/assets/hero/cars.svg";
import { NavLink } from "react-router-dom";
import ChevronRight from '../../assets/hero/chevron-right.svg'
import ChevronLeft from '../../assets/hero/chevron_left.svg'

// Define types for the menu and submenu items
interface SubmenuItem {
  id: number;
  name: string;
  link: string;
}

interface MenuItem {
  id: number;
  name: string;
  link: string;
  img: string;
  submenu?: SubmenuItem[];
}

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const Hero: React.FC = () => {
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isOverflow, setIsOverflow] = useState<boolean>(false); // Track if overflow is enabled
  const menuItemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Sample menu data
  const menus: MenuItem[] = [
    {
      id: 1,
      name: "Furniture",
      link: "/",
      img:`${furniture}`,
      submenu:[
        {
          id:1,
          name:" Cat 1 Sub One",
          link:""
        },
        {
          id:2,
          name:"Cat 1 Sub Two",
          link:""
        },
        {
          id:3,
          name:"Cat 1 Sub Three",
          link:""
        }
      ]
    },
    {
      id: 2,
      name: 'Cooking',
      link: "shop",
      img:`${cooking}`,
      submenu:[
        {
          id:1,
          name:" Cat 2 Sub One",
          link:""
        },
        {
          id:2,
          name:"Cat 2 Sub Two",
          link:""
        },
        {
          id:3,
          name:"Cat 2 Sub Three",
          link:""
        }
      ]
    },
      
    { 
      id: 3,
        name: 'Accessories',
        link: "",
        img:`${accessories}`,
        submenu:[
          {
            id: 1,
            name:" Cat 3 Sub One",
            link:""
          },
          {
            id: 2,
            name:"Cat 3 Sub Two",
            link:""
          },
          {
            id: 3,
            name:"Cat 3 Sub Three",
            link:""
          }
      ]
    },
      
    { 
      id: 4,
      name: 'Fashion',
      link: "/#",
      img:`${fashion}`,
      submenu:[
        {
          id: 1,
          name:" Cat 4 Sub One",
          link:""
        },
        {
          id: 2,
          name:"Cat 4 Sub Two",
          link:""
        },
        {
          id: 3,
          name:"Cat 4 Sub Three",
          link:""
        }
      ]
    },
        
    { 
      id: 5,
      name: 'Clocks',
      link: "",
      img:`${clocks}`,
      submenu:[
        {
          id: 1,
          name: " Cat 5 Sub One",
          link: ""
        },
        {
          id: 2,
          name: "Cat 5 Sub Two",
          link: ""
        },
        {
          id: 3,
          name: "Cat 5 Sub Three",
          link: ""
        }
      ]
    },
    {
      id: 6,
      name: 'Lighting',
      link: "",
      img:`${lighting}`,
      submenu:[
        {
          id: 1,
          name: "Cat 6 Sub One",
          link: ""
        },
        {
          id: 2,
          name: "Cat 6 Sub Two",
          link: ""
        },
        {
          id: 3,
          name: "Cat 6 Sub Three",
          link: ""
        }
      ]
    },
    { 
      id:7,
      name: 'Hand Made',
      link: "",
      img:`${handMade}`,
      submenu:[
        {
          id: 1,
          name: "Cat 7 Sub One",
          link: ""
        },
        {
          id: 2,
          name: "Cat 7 Sub Two",
          link: ""
        },
        {
          id: 3,
          name: "Cat 7 Sub Three",
          link: ""
        }
      ]
    },
    { 
      id: 8,
      name: 'Minimalism',
      link: "",
      img:`${minimalism}`,
      submenu:[
        {
          id: 1,
          name: "Cat 8 Sub One",
          link: ""
        },
        {
          id: 2,
          name: "Cat 8 Sub Two",
          link: ""
        },
        {
          id: 3,
          name: "Cat 8 Sub Three",
          link: ""
        }
      ]
    },
    { 
      id: 9,
      name: 'Electronics',
      link: "",
      img:`${electronics}`,
      submenu:[
        {
          id: 1,
          name: "Cat 9 Sub One",
          link: ""
        },
        {
          id: 2,
          name: "Cat 9 Sub Two",
          link: ""
        },
        {
          id: 3,
          name: "Cat 9 Sub Three",
          link: ""
        }
      ]
    },
    { 
      id: 10,
      name: 'Toys',
      link: "",
      img:`${toys}`,
      submenu:[
        {
          id: 1,
          name: "Cat 10 Sub One",
          link: ""
        },
        {
          id: 2,
          name: "Cat 10 Sub Two",
          link: ""
        },
        {
          id: 3,
          name: "Cat 10 Sub Three",
          link: ""
        }
      ]
    },
  
    { 
      id: 11,
      name: 'Cars',
      link: "",
      img:`${cars}`,
      submenu:[
        // {
        //   id:1,
        //   name:" Cat 11 Sub One",
        //   link:""
        // },
        
      ]
    },      
  ];

  // Array of slide data
  const slides: Slide[] = [
    {
      image: `${Image1}`,
      title: 'Amazing Product 1',
      subtitle: 'Best in Class',
      description: 'This is a wonderful product that meets all your needs and exceeds expectations.'
      
    },
    {
      image: `${Image2}`,
      title: 'Incredible Product 2',
      subtitle: 'High Quality Guaranteed',
      description: 'Get this product to enjoy the latest features at a great price.'
      
    },
    {
      image: `${Image3}`,
      title: 'Outstanding Product 3',
      subtitle: 'Affordable Luxury',
      description: 'Affordable and feature-rich, this product is perfect for everyone.'
    },
  ];

  // Recalculate if overflow happens in the sidebar
  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      const checkOverflow = () => {
        const hasOverflow = sidebar.scrollHeight > sidebar.clientHeight;
        setIsOverflow(hasOverflow);
        console.log('Overflow detected:', hasOverflow); // Debugging log
      };
      checkOverflow();
      // Optional: Recheck on window resize
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
    }
  }, []);

  // Slideshow: Handle automatic slide change
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
  
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [slides.length]);

  // Manual slide change
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Calculate the submenu position based on the hovered menu item
  const handleMouseEnter = (index: number, menuId: number) => {
    const menuItem = menuItemRefs.current[index];
    if (menuItem) {
      const rect = menuItem.getBoundingClientRect();
      setSubmenuPosition({
        top: rect.top, // Set the top position based on the rect
        left: rect.right + (isOverflow ? 20 : 0), // Set the left position to the right of the menu item
      });
    }
    setHoveredMenu(menuId);
  };

  // Handle mouse leave for both menu item and submenu
  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  // Render submenu in a portal
  const renderSubmenu = (menu: MenuItem) => {   
    return ReactDOM.createPortal(
      <div
        className="absolute z-10 bg-white border border-gray-200 rounded shadow-lg"
        style={{ top: submenuPosition.top, left: submenuPosition.left }}
        onMouseEnter={() => setHoveredMenu(menu.id)} // Keep submenu open when hovering over it
        onMouseLeave={handleMouseLeave} // Close submenu when leaving submenu area
      >
        <ul>
          {menu.submenu?.map((subItem) => (
            <li key={subItem.id} className="border-b-1 border-gray-300 text-[13px] px-4 py-[10px] font-semibold text-gray-700  hover:text-primary">
              <a href={subItem.link}>{subItem.name}</a>
            </li>
          ))}
        </ul>
      </div>,
      document.body // Render outside the scrollable sidebar
    );
  };
  
  return (
    <div className="flex relative container h-hero-height">
      {/* Left Sidebar */}
      <div className="bg-white w-[246px]  border-x-1 border-b-1 border-gray-300 overflow-auto" ref={sidebarRef}>
        <ul className="divide-y">
          {menus.map((menu, index) => (
            <NavLink to={menu.link}>
              <li key={menu.id} className="relative group border-b-1 border-gray-300 text-[13px] px-4 py-[10px] font-semibold text-gray-700  hover:text-primary "
              onMouseEnter={() => handleMouseEnter(index, menu.id)}
              ref={(el) => (menuItemRefs.current[index] = el)}>
                <div className=" flex items-center justify-between">
                  <div className='flex items-center justify-start gap-4'>
                    {menu.img && <img src={menu.img} alt="" width={20}/>}
                    {menu.name}
                  </div>
                  {menu.submenu!.length >0 ?<div><img src={ChevronRight} alt="" width={18}/> </div>:null}
                </div>
              </li>
            </NavLink>
            
          ))}
        </ul>
      </div>

      {/* Submenu */}
      {hoveredMenu && menus.find((menu) => menu.id === hoveredMenu)?.submenu && (
        renderSubmenu(menus.find((menu) => menu.id === hoveredMenu)!)
      )}

      {/* Right Content - Slideshow */}
      <div className="flex-1 relative">
        <div className="relative h-hero-height overflow-hidden">
          {/* Slide Content */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-end transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Slide Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-1/2  object-fill"
              />

              {/* Slide Text */}
              <div className="absolute  left-16 top-12 text-gray-700 p-4 w-[450px] font-nav">
                <h1 className="text-4xl font-bold">{slide.title}</h1>
                <h2 className="text-[17px] my-2">{slide.subtitle}</h2>
                <p className="my-4 text-[17px]">{slide.description}</p>
                <button className="font-nav bg-gradient-to-r from-primary to-secondary  duration-200 text-white  py-2 px-6 my-4 rounded-full transition-transform transform hover:scale-105">
                  <NavLink to='shop'>Buy Now</NavLink>
                </button>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2  text-primary px-2 py-1"
            onClick={handlePrevSlide}
          >
            <img src={ChevronLeft} alt="" width={24} /> 
            {/* &lt; */}
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-primary px-2 py-1 "
            onClick={handleNextSlide}
          >
            <img src={ChevronRight} alt="" width={24} /> 
            {/* &gt; */}
          </button>
          {/* Dots Navigation */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-[6px] h-[6px] rounded-full ${index === currentSlide ? 'bg-primary' : 'bg-gray-400'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;








