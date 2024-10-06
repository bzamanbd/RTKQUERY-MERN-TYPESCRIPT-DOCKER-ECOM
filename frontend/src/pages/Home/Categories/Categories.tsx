import { FC } from "react"
import { useCategoryQuery } from "../../../services/redux/api/productApi"


const Categories: FC = () => {
    const {data, isLoading, isError} = useCategoryQuery(""); 
    if(isLoading)return <div>Loading.....</div>
    if(isError || !data || !data.data.categories )return <div>Error occurred fetching categories</div>
    const categories = data.data.categories;
    return (
        <section className="category-section bg-gray-200 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Map your categories here */}
                    { 
                        categories.map((category)=>( 
                            <div className="category-card bg-white shadow-md p-4 text-center">
                                <img src="/path-to-category-image.jpg" alt="Category" className="w-full h-32 object-cover" />
                                <h3 className="text-lg font-bold mt-4">{category}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Categories;



