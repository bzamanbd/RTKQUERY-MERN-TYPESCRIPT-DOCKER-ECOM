import React from "react";
import { Product } from "../../vite-env";
import { server } from "../../services/redux/store";
import AddShoppingCartIcon from "../Common/AddShoppingCartIcon";
import ShoppingCartIcon from "../Common/ShoppingCart";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { _id, name, description, price, photos } = product;

  return (
    <div className="relative container border-1 border-gray-300 rounded overflow-hidden p-4 bg-white hover:bg-primary/30 duration-300">
      <div className="img h-[250px]">
        <img src={`${server}/${photos[0]}`} alt={name} className="w-full" />
      </div>
      <div className="w-full h-[150px]">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-700 ">{description}</p>
      </div>
      <div className="font-nav text-sm">
        <span className="font-semibold text-gray-700">TK.{price}</span>
      </div>
      <div className="flex gap-5 items-center justify-between w-full ">
        <div className="flex-1 border-1 border-gray-300 flex items-center justify-center py-1 ">
          <button className="w-10 text-gray-700">-</button>
          <span className="font-nav text-sm font-semibold text-gray-700">
            100
          </span>
          <button className="w-10 text-gray-700">+</button>
        </div>
        <button
          className="relative bg-primary text-white font-normal p-3 rounded flex items-center justify-center group overflow-hidden hover:scale-105"
          onClick={() => onAddToCart(_id)}
        >
          <ShoppingCartIcon className=" opacity-100 group-hover:opacity-0 transition-all duration-300 transform transform-y-fll group-hover:-translate-y-0" />
          <AddShoppingCartIcon className="absolute h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
