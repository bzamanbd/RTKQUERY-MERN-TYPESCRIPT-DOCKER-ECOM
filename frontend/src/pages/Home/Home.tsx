import { FC } from "react";
import BannerOne from "./BannerOne/BannerOne";
import Hero from "./Hero/Hero";
import Products from "./Products/Products";
import Categories from "./Categories/Categories";


const Home: FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <Hero/>
      {/* Banner Section */}
      <BannerOne/>
      
      {/* Products Section */}
      <Products/>
      


      {/* Category Section */}
      <Categories/>

      {/* Blog Section */}
      <section className="blog-section py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Map your blog posts here */}
            <div className="blog-card bg-white shadow-md p-4">
              <img src="/path-to-blog-image.jpg" alt="Blog" className="w-full h-48 object-cover" />
              <h3 className="text-lg font-bold mt-4">Blog Title</h3>
              <p className="mt-2">Blog summary or excerpt...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Map your services here */}
            <div className="service-card bg-white shadow-md p-4 text-center">
              <img src="/path-to-service-icon.jpg" alt="Service" className="w-16 h-16 mx-auto" />
              <h3 className="text-lg font-bold mt-4">Service Name</h3>
              <p className="mt-2">Service description...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
          <div className="flex justify-center space-x-8">
            {/* Map your partners here */}
            <img src="/path-to-partner-logo.jpg" alt="Partner" className="h-12" />
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
