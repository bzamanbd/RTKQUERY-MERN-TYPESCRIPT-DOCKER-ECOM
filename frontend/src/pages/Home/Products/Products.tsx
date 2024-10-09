import { FC } from "react"
import { useLatestQuery } from "../../../services/redux/api/productApi"
import { Product } from "../../../vite-env";
import { RootState, server } from "../../../services/redux/store";
import { CartItem } from "../../../types/reducer-types";
import toast from "react-hot-toast";
import { useDispatch, useSelector} from "react-redux";
import { addToCart } from "../../../services/redux/reducer/cartReducer";

const Products: FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartReducer.items);
  const {data, isLoading, isError} = useLatestQuery(""); 
  if(isLoading)return <div>Loading.....</div>
  if(isError || !data || !data.data.products )return <div>Error occurred fetching data </div>
  const products:Product[] = data.data.products;

  const addToCartHandler = (newCartItem:CartItem)=>{ 
    if(newCartItem.stock<1) return toast.error('Out of  stock');
    const isItemAlreadyInCart = cartItems.some((item) => item.productId === newCartItem.productId); 
    if (isItemAlreadyInCart) {
      toast.error('Item already in cart');
    } else {
      dispatch(addToCart(newCartItem));
      toast.success('Item added to cart');
      console.log('CartItem====>', newCartItem);
    }
  }

  return (
    <section className="products-section py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map your product components here */}
          { 
            products.map((product)=>( 
              <div key={product._id} className="relative group product-card bg-white shadow-md p-4 overflow-hidden">
                <img src={`${server}/${product.photos[0]}`} alt="Product" className="w-full h-48 object-cover" />
                <div className="flex justify-between text-lg font-bold mt-4"> 
                  <h3>{product.name}</h3>
                </div>
                <div className="flex justify-between"> 
                  <p className="mt-2">{`Tk.${product.price}`}</p>
                  <p className="mt-2">{product.category}</p>
                </div>
                
                {/* Add to Cart Button (Hidden by Default, Shown on Hover) */}
                <button className="absolute top-[6rem] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={()=>addToCartHandler({
                  productId:product._id, 
                  name:product.name, 
                  photo:product.photos[0],
                  stock:product.stock, 
                  quantity:1,
                  price:product.price
                })}
                >
                
                Add to Cart
                </button>

              </div>

            ))
          }
          
        </div>
      </div>
    </section>
  )
}

export default Products;

