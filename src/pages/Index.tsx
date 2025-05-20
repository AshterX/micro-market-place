
// Update this page to add a button to go to the Marketplace

import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ece9f7] to-[#f9f8fb]">
      <div className="text-center p-8 bg-white/80 rounded-2xl shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to Your MSME Marketplace</h1>
        <p className="text-xl text-gray-600 mb-8">Discover and shop top MSME products tailored for you!</p>
        <Link
          to="/marketplace"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-violet-700 transition text-lg font-semibold"
        >
          Visit Marketplace
        </Link>
      </div>
    </div>
  );
};

export default Index;
