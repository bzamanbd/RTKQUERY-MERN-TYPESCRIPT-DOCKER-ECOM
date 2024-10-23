import { FC } from "react"
import Image1 from "../../../src/assets/upper-banner/dress-one.jpg";
import Image2 from "../../../src/assets/upper-banner/dress-two.avif";
import {Image} from "@nextui-org/react";
import AddShoppingCartIcon from "../Common/AddShoppingCartIcon";
import { NavLink } from "react-router-dom";

interface BannerItem{ 
    id: number;
    title: string;
    description: string;
    img: string;
}

const UpperBanner:FC = () => { 
    const banners: BannerItem [] = [
        {
            id: 1,
            title: "Title One Title One Title OneTitle One",
            description:"description one description one description one description one description one description onedescription onedescription onedescription one",
            img:`${Image1}`
        },
        {
            id: 2,
            title: "Title Two Title Two Title",
            description:"description two",
            img: `${Image2}`
        }
    ]
  return (
    <div className="container mt-[50px] flex items-center justify-between h-upper-banner-height font-nav text-gray-700 text-[14px] gap-10 ">
        { banners.map((banner,idx)=>(
            <div key={idx} className="h-full w-1/2 bg-primary/20 flex items-center justify-between">
                <div className="flex flex-col items-start justify-around w-1/2 h-[200px] p-y-10 px-6 ml-4">
                    <span className="font-semibold text-[20px]">{banner.title}</span>
                    <div className="w-full h-1/3 overflow-auto mt-2">
                        <span>{banner.description}</span>
                    </div>
                    <NavLink to='shop'>
                        <button className="relative bg-primary text-white font-bold h-10 w-36 py-2 px-4 rounded flex items-center justify-center group overflow-hidden">
                            <span className=" opacity-100 group-hover:opacity-0 transition-all duration-300 transform transform-y-fll group-hover:-translate-y-0">
                                Shop Now
                            </span>
                            <AddShoppingCartIcon className="absolute h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0"/>
                        </button>
                    </NavLink>
                </div>
                <Image isZoomed src={banner.img} alt="" className="w-[250px] h-[250px]"/>
            </div>
        ))}
    </div>
  )
}

export default UpperBanner
