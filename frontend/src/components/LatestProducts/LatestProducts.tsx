import {FC} from 'react';
import { useLatestQuery } from '../../services/redux/api/productApi';
import { Product } from '../../vite-env';
import { server } from '../../services/redux/store';
import AddShoppingCartIcon from '../Common/AddShoppingCartIcon';

const LatestProducts:FC = () => {
  const { data, isLoading, isError } = useLatestQuery("");
  if (isLoading) return <div>Loading.....</div>;
  if (isError || !data || !data.data.products)
    return <div>Error occurred fetching data </div>;

  const products: Product[] = data.data.products;
  const slicedProducts = products.slice(0, 8);

  return (
    <div className="container font-nav">
      {/* Header section */}
      <div className=" container text-center mb-36 mt-32 max-w-[500px]">
        <p data-aos="fade-up" className="text-sm text-primary">
          Latest Products for you
        </p>
        <h1 data-aos="fade-up" className="text-3xl font-bold uppercase">
          New Arrival
        </h1>
        <p data-aos="fade-up" className="text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
          asperiores modi Sit asperiores modi
        </p>
      </div>

      {/* Body section */}
      <div className=" grid grid-cols-4 items-center gap-x-8 gap-y-28">
        {slicedProducts.map((product) => (
          <div
            data-aos="zoom-in"
            className="relative rounded-lg bg-white  hover:bg-primary/30   shadow-xl duration-300 group max-w-[300px] border-1 border-gray-300"
          >
            {/* image section */}
            <div className="h-[160px]">
              <img
                src={`${server}/${product.photos[0]}`}
                alt=""
                className="w-[160px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md  rounded-sm"
              />
            </div>
            {/* details section */}
            <div className="flex flex-col items-center p-4 text-center font-nav text-gray-700 break-words mx-auto">
              <h1 className="text-xl font-bold">{product.name}</h1>
              <p className="text-gray-500 text-sm line-clamp-2 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                sint iusto adipisci fugit modi molestias tenetur, nisi vero
                alias natus voluptates quibusdam earum commodi minus facilis
                perspiciatis illo ab neque.
              </p>
              <button className="relative bg-primary text-white font-normal h-10 w-36 py-2 px-4 rounded flex items-center justify-center group overflow-hidden hover:scale-105 mt-8">
                <span className=" opacity-100 group-hover:opacity-0 transition-all duration-300 transform transform-y-fll group-hover:-translate-y-0">
                  Add to Cart
                </span>
                <AddShoppingCartIcon className="absolute h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;