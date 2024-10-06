import { FC } from "react";

const ShopPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-1/4 bg-white p-4 shadow-md rounded-lg">
          {/* Search Bar */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Search Products</h2>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Sort by Price */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Sort by Price</h2>
            <ul className="space-y-2">
              <li>
                <label className="flex items-center">
                  <input type="radio" name="sortPrice" className="mr-2" />
                  Low to High
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="radio" name="sortPrice" className="mr-2" />
                  High to Low
                </label>
              </li>
            </ul>
          </div>

          {/* Sort by Category */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Sort by Category</h2>
            <ul className="space-y-2">
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Electronics
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Clothing
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Home Appliances
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Sports Equipment
                </label>
              </li>
            </ul>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Price Range</h2>
            <input
              type="range"
              min="0"
              max="1000"
              className="w-full"
            />
            <div className="flex justify-between text-gray-600 mt-2">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>
        </aside>

        {/* Main Content (Product List) */}
        <div className="w-3/4 ml-6">
          <h1 className="text-3xl font-bold mb-6">Products</h1>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Example Product Card */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="/assets/product-image.jpg"
                alt="Product"
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">Product Name</h3>
              <p className="text-gray-500 mt-2">$99.99</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Add to Cart
              </button>
            </div>
            {/* Repeat Product Cards */}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav aria-label="Pagination">
              <ul className="inline-flex items-center -space-x-px">
                {/* Previous Button */}
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Previous
                  </a>
                </li>

                {/* Page Numbers */}
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    3
                  </a>
                </li>

                {/* Next Button */}
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
