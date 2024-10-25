import { FC } from "react";
import { Divider } from "@nextui-org/divider";
import {
  useCategoryQuery,
  useSearchProductsQuery,
} from "../../services/redux/api/productApi";
import ProductCard from "../ProductCard/ProductCard";

const CategoryOneProducts: FC = () => {
  const { data: categoryData } = useCategoryQuery();
  // Provide a fallback value to ensure the hook is always called
  const firstCategoryName = categoryData?.data.categories[0];
  // Call useSearchProductsQuery unconditionally with the fallback
  const {
    data: firstCategoryProducts,
    isLoading,
    isError,
  } = useSearchProductsQuery({
    search: "",
    sort: "",
    category: firstCategoryName,
    price: undefined,
    page: 1,
  });
  if (isLoading) return <div>Loading products.....</div>;
  if (isError || !firstCategoryProducts || !firstCategoryProducts.data.products)
    return <div>Error to fetching products</div>;
  const products = firstCategoryProducts.data.products;
  const slicedProducts = products.slice(0, 10);
  console.log("Sliced Products=>", slicedProducts);

  const handleAddToCart = (productId: string) => {
    console.log(`Product ${productId} added to cart!`);
    // Handle add to cart logic here
  };

  return (
    <div className="container mt-32 font-nav">
      {/* Header section */}
      <div className="mb-10">
        <h1
          data-aos="fade-up"
          className="text-2xl font-nav font-semibold uppercase"
        >
          {firstCategoryName}
        </h1>
        <Divider className="my-1" />
      </div>
      {/* Body section */}
      <div className="grid grid-cols-5 items-center gap-x-8 gap-y-28">
        {slicedProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryOneProducts;
