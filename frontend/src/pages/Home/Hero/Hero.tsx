import { FC } from "react"
import heroImage from '../../../assets/home-page/hero-image.jpg';

const Hero:FC = () => {
  return (
    <section className="relative hero-section bg-cover bg-center h-[34rem] text-white flex items-center justify-center "     style={{ backgroundImage: `url(${heroImage})`}}> 
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold">Welcome to HealthBank</h1>
          <p className="text-lg mt-4">Discover amazing health-care products at unbeatable prices</p>
          <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button>
        </div>
      </section>
  )
}

export default Hero
