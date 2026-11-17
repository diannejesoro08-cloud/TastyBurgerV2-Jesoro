interface ProductFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function ProductFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: ProductFilterProps) {
  return (
    <div>
      {/* Search Input Section */}
      <div className="px-4 lg:px-6 pb-6 border-b border-gray-700">
        <label className="block text-sm font-medium mb-2 text-white">Search Menu</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search burgers..."
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:border-yellow-400 text-sm"
        />
      </div>

      {/* Category Radio Buttons */}
      <div className="space-y-4 border-b px-4 lg:px-6 py-6 border-gray-700">
        <div className="flex flex-row items-center gap-2">
          <input
            type="radio"
            value="all"
            name="type"
            checked={selectedCategory === "all"}
            onChange={() => onSelectCategory("all")}
            className="bg-yellow-800 checked:bg-yellow-400 cursor-pointer"
          />
          <label className="text-white cursor-pointer">All</label>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input
            type="radio"
            value="ham"
            name="type"
            checked={selectedCategory === "ham"}
            onChange={() => onSelectCategory("ham")}
            className="bg-yellow-800 checked:bg-yellow-400 cursor-pointer"
          />
          <label className="text-white cursor-pointer">Ham</label>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input
            type="radio"
            value="chicken"
            name="type"
            checked={selectedCategory === "chicken"}
            onChange={() => onSelectCategory("chicken")}
            className="bg-yellow-800 checked:bg-yellow-400 cursor-pointer"
          />
          <label className="text-white cursor-pointer">Chicken</label>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;