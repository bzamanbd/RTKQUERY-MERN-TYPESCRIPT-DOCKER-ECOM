import React from "react";
import { Product } from "../../vite-env";
import { server } from "../../services/redux/store";
import AddShoppingCartIcon from "../Common/AddShoppingCartIcon";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { _id, name, description, photos } = product;

  return (
    <div className="relative max-w-xs border-1 border-gray-300 rounded overflow-hidden p-4 bg-white hover:bg-primary/30 duration-300">
      <img
        className="w-full h-48 object-cover"
        src={`${server}/${photos[0]}`}
        alt={name}
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-3 pt-4 pb-2">
        <button
          className="relative bg-primary text-white font-normal h-10 w-36 py-2 px-4 rounded flex items-center justify-center group overflow-hidden hover:scale-105 mt-8"
          onClick={() => onAddToCart(_id)}
        >
          <span className=" opacity-100 group-hover:opacity-0 transition-all duration-300 transform transform-y-fll group-hover:-translate-y-0">
            Add to Cart
          </span>
          <AddShoppingCartIcon className="absolute h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
