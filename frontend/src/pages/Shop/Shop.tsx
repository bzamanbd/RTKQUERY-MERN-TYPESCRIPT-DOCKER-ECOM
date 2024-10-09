import { FC, useState } from "react";
import { useCategoryQuery, useSearchProductsQuery } from "../../services/redux/api/productApi";
import toast from "react-hot-toast";
import { RootState, server } from "../../services/redux/store";
import { CartItem } from "../../types/reducer-types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../services/redux/reducer/cartReducer";

const ShopPage: FC = () => {
  const dispatch =  useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartReducer.items);  
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const {data:categoryResponse, isLoading:loadingCategories, isError:categoryIsError} = useCategoryQuery(""); 
  const {data:searchData, isLoading:searchProductsLoading,isError:searchProductIsError} = useSearchProductsQuery({
    search, sort, price:maxPrice, category, page 
  });
  const isPrevPage = page > 1; 
  const isNextPage = page < 4;
  if(categoryIsError)return toast.error(categoryResponse!.message);
  if(searchProductIsError)return toast.error(searchData!.message);
  
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-1/4 bg-white p-4 shadow-md rounded-lg">
          {/* Search Bar */}
          <div className="mb-6">
            {/* <h2 className="text-xl font-semibold mb-3">Search Products</h2> */}
            <label className="block text-sm font-medium text-gray-600" >Search Products</label>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Sort by Price */}
          <div className="mb-6"> 
            <label className="block text-sm font-medium text-gray-600" >Sort By:</label>
              <select className="mt-1 p-2 border rounded w-full"
              value={sort} 
              onChange={(e)=>setSort(e.target.value)}
              >
                <option value="">None</option> 
                <option value="asc">Price (Low to High)</option> 
                <option value="dsc">Price (High to Low)</option> 
              </select>

          </div>

          {/* Sort by Category */}
          <div className="mb-6"> 
            <label className="block text-sm font-medium text-gray-600" >Category:</label>
              <select className="mt-1 p-2 border rounded w-full"
              value={category} 
              onChange={(e)=>setCategory(e.target.value)}
              >
                <option value="">All</option> 
                { 
                  !loadingCategories && categoryResponse?.data.categories.map((i)=>( 
                    <option key={i} value={i}>{i.toUpperCase()}</option>
                  ))
                }
              </select>

          </div>
          
          {/* Price Range Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-600" >Price Range:</label>
            <div className="flex items-center space-x-2"> 
              <span className="text-xs">Max:{maxPrice || ""}</span>
              <input type="range" 
                min={100} 
                max={10000} 
                value={maxPrice} 
                onChange={(e)=> setMaxPrice(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs">${maxPrice}</span>
            </div>
          </div>
        </aside>

        {/* Main Content (Product List) */}
        <div className="w-3/4 ml-6">
          <h1 className="text-3xl font-bold mb-6">Products</h1>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Example Product Card  */}
            { 
            searchProductsLoading? <p>Loading..... </p> : 
            searchData?.data.products.map((product)=>( 
              <div key={product._id} className="bg-white shadow-md rounded-lg p-4"> 
              <img src={`${server}/${product.photos[0]}`} alt="product-photo" className="w-full h-64 object-cover mb-4"/>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500 mt-2">{`Tk ${product.price}`}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
              onClick={()=>addToCartHandler({
                productId:product._id, 
                name:product.name,
                photo:product.photos[0],  
                price:product.price,
                stock:product.stock,
                quantity:1
              })}
              >
                Add to Cart
              </button>
            </div>
            ))
            }
            

            {/* Repeat Product Cards */}
          </div>

          
          {/* Pagination */}
          <article className="p-4 flex justify-center items-center"> 
            
            <button 
              className={`px-4 py-2 text-gray-300 mr-2 rounded-md ${!isPrevPage? 'bg-gray-400 text-gray-700 cursor-not-allowed':'bg-blue-800'}`}
              disabled={!isPrevPage}
              onClick={()=>setPage((cp)=>cp-1)}
              >
              Prev
            </button> 
            <span className="text-lg font-bold"></span>
            <button 
              className={`px-4 py-2 text-gray-300 ml-2 rounded-md ${!isNextPage? 'bg-gray-400 text-gray-700 cursor-not-allowed':'bg-blue-800'}`}
              disabled={!isNextPage}
              onClick={()=>setPage((cp)=>cp+1)}
              >
              Next
            </button> 

          </article>

        </div>
       
      </div>
    </div>
  );
};

export default ShopPage;
