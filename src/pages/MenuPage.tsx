import { useState } from "react";
import MenuItem from "../components/MenuItem";
import foodMenu from "../constants/foodMenu.json";
import ProductFilter from "../components/ProductFilter";
import { useGlobalContext } from "../context/store";
import type { MenuItemProps } from "../types";

function MenuPage() {
  const { cart, updateCart } = useGlobalContext();
  const [openFilters, setOpenFilters] = useState(true);
  
  // States for filter category and search query
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const onAddToCart = (newItem: MenuItemProps) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((obj) => obj.id === newItem.id);
    if (index !== -1) updatedCart[index].quantity += 1;
    else updatedCart.push({ ...newItem, quantity: 1 });
    updateCart(updatedCart);
  };

  // Filter items matching both the category selection and search input
  const filteredMenu = foodMenu.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-4 pt-36 lg:px-24 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-gray-500/5 rounded-lg backdrop-filter backdrop-blur-lg text-white h-fit">
          <button
            type="button"
            onClick={() => setOpenFilters(!openFilters)}
            className="w-full flex flex-row justify-between items-center py-4 px-4 lg:px-6 border-b border-gray-500"
          >
            <span>Filters</span>
            <svg
              className="w-8 h-8 text-white"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {openFilters && (
            <div className="py-4">
              <ProductFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          )}
        </div>

        {/* Menu Items Grid */}
        <div className="w-full lg:w-3/4">
          {filteredMenu.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 w-full">
              {filteredMenu.map((item) => (
                <MenuItem key={item.id} {...item} addToCart={onAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-white text-center py-12">
              <p className="text-lg">No burgers found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;