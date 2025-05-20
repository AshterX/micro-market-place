
import React, { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    title: "Wireless Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    price: 79.99,
    location: "Mumbai",
  },
  {
    id: 2,
    title: "Designer Dress",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    price: 54.99,
    location: "Delhi",
  },
  {
    id: 3,
    title: "Smart Oven",
    category: "Home Appliances",
    image: "https://images.unsplash.com/photo-1506368083636-6defb67639d0?auto=format&fit=crop&w=400&q=80",
    price: 129.99,
    location: "Chennai",
  },
  {
    id: 4,
    title: "Packaged Snacks (FMCG)",
    category: "FMCG",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    price: 2.99,
    location: "Bangalore",
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    price: 39.5,
    location: "Pune",
  },
  {
    id: 6,
    title: "Cotton Saree",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80",
    price: 24.95,
    location: "Kolkata",
  },
];

const CATEGORIES = ["All", "Electronics", "FMCG", "Fashion", "Home Appliances"];
const LOCATIONS = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.location)))];
const PRICE_MIN = 0;
const PRICE_MAX = 150;

// --- Search bar component ---
function SearchBar({ value, setValue }) {
  return (
    <div className="flex items-center w-full max-w-lg mx-auto mb-4">
      <input
        type="text"
        placeholder="Search for products..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <span className="bg-primary px-3 py-2 rounded-r-md text-white">
        <Search size={20} />
      </span>
    </div>
  );
}

// --- Filter sidebar ---
function FilterSidebar({ category, setCategory, location, setLocation, price, setPrice }) {
  return (
    <aside className="w-72 min-w-[210px] border-r border-gray-200 bg-white rounded-xl shadow-lg p-6 mb-4 md:mb-0 md:mr-6">
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-lg text-gray-700">Category</h3>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-2 text-lg text-gray-700">Location</h3>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {LOCATIONS.map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2 text-lg text-gray-700">Price Range</h3>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>₹{PRICE_MIN}</span>
          <span>₹{PRICE_MAX}</span>
        </div>
        <div className="mt-1 text-sm text-primary">{price ? `Under ₹${price}` : `All Prices`}</div>
      </div>
    </aside>
  );
}

// --- POD Modal ---
function PodModal({ open, onClose, onSave }) {
  const [customText, setCustomText] = useState("");
  return (
    open ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded-xl w-[95vw] max-w-sm shadow-xl flex flex-col items-stretch">
          <h2 className="text-xl font-bold mb-2">Print on Demand Customization</h2>
          <input
            className="border border-gray-300 rounded px-3 py-2 mb-3"
            placeholder="Your custom text"
            value={customText}
            onChange={e => setCustomText(e.target.value)}
          />
          <button
            className="py-2 px-4 rounded bg-primary text-white font-semibold hover:bg-violet-600 transition"
            onClick={() => {
              onSave(customText);
              setCustomText("");
            }}
          >Save & Close</button>
          <button className="mt-4 text-xs text-gray-600 underline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    ) : null
  );
}

// --- Product Card ---
function ProductCard({ product, onBuy, onCustomize }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:scale-[1.03] transition-all">
      <img src={product.image} alt={product.title} className="rounded-lg object-cover h-40 mb-4 w-full" />
      <div className="flex flex-col flex-grow">
        <div className="font-bold text-md mb-1">{product.title}</div>
        <div className="text-xs text-gray-500 mb-2">{product.category} • {product.location}</div>
        <div className="text-primary text-lg font-semibold mb-4">₹{product.price}</div>
        <div className="mt-auto flex gap-2">
          <button
            className="flex-1 py-2 rounded bg-primary text-white hover:bg-violet-700 font-semibold"
            onClick={() => onBuy(product)}
          >
            Buy Now
          </button>
          <button
            className="flex-1 py-2 rounded border border-primary text-primary hover:bg-violet-50 font-semibold"
            onClick={() => onCustomize(product)}
          >
            POD
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Marketplace Page ---
const Marketplace = () => {
  // Filters and search states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [price, setPrice] = useState(PRICE_MAX);
  const [showPod, setShowPod] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products dynamically
  const filteredProducts = PRODUCTS.filter(p => {
    const byCategory = category === "All" || p.category === category;
    const byLocation = location === "All" || p.location === location;
    const byPrice = !price || p.price <= price;
    const bySearch = !search || 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return byCategory && byLocation && byPrice && bySearch;
  });

  // Handle Buy Now click
  const handleBuy = (product) => {
    // Here, mock ICICI payment gateway (real integration would redirect or open payment checkout)
    toast({
      title: "Redirecting to ICICI Bank",
      description: `Mock checkout for "${product.title}" (₹${product.price})`,
    });
    window.open("https://www.icicibank.com/", "_blank");
  };

  // Handle POD
  const handleCustomize = (product) => {
    setSelectedProduct(product);
    setShowPod(true);
  };

  // Save POD customization (mock)
  const handlePodSave = (customText) => {
    setShowPod(false);
    toast({
      title: "POD Customization Saved",
      description: customText ? `Your customization: "${customText}"` : "No customization entered.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f8fb] to-[#e5deff] py-10 px-2">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#1A1F2C]">Marketplace</h1>
      <p className="text-center text-gray-500 mb-8 text-lg">Shop top MSME products in Electronics, FMCG, Fashion, Home Appliances, and more.</p>
      <div className="w-full flex flex-col md:flex-row md:items-start max-w-7xl mx-auto">
        <FilterSidebar
          category={category}
          setCategory={setCategory}
          location={location}
          setLocation={setLocation}
          price={price}
          setPrice={setPrice}
        />
        <div className="flex-1 min-w-0">
          <SearchBar value={search} setValue={setSearch} />
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-16">
                No products found. Try adjusting your filters.
              </div>
            ) : (
              filteredProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onBuy={handleBuy}
                  onCustomize={handleCustomize}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <PodModal
        open={showPod}
        onClose={() => setShowPod(false)}
        onSave={handlePodSave}
      />
    </div>
  );
};

export default Marketplace;

