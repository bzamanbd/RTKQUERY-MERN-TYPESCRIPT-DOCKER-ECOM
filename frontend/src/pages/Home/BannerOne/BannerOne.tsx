import { FC } from "react"
import bannerOne from '../../../assets/home-page/banner-one.jpg';

const BannerOne: FC = () => {
  return (
    <section className="banner-section bg-gray-100 py-10">
        <div className="container mx-auto">
          <img src={bannerOne} alt="Banner" className="w-full h-[22rem]" />
        </div>
      </section>
  )
}

export default BannerOne
