
import React from "react";

const CategorySection = () => {
    const categories = [
        { name: "Samsung", link: "/category/samsung" },
        { name: "Apple", link: "/category/apple" },
        { name: "Xiaomi", link: "/category/xiaomi" },
        { name: "OnePlus", link: "/category/oneplus" },
        { name: "Realme", link: "/category/realme" },
        { name: "Vivo", link: "/category/vivo" },
        { name: "Oppo", link: "/category/oppo" },
        { name: "Motorola", link: "/category/motorola" },
    ];

    return (
        <div className="bg-gray-100 py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
            
                <div className="hidden sm:grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 ">
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href={category.link}
                            className="text-center bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-500 hover:text-white transition"
                        >
                            {category.name}
                        </a>
                    ))}
                </div>

           
                <div className=" scrollbar-hide sm:hidden flex space-x-4 overflow-x-auto ">
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href={category.link}
                            className="flex-shrink-0 bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-500 hover:text-white transition "
                        >
                            {category.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;
