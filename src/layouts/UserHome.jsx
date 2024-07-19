import { Link } from "react-router-dom";

export default function UserHome() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-custom-bg bg-cover bg-center filter blur-xs"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-8">Welcome to Our Restaurant</h1>
          <div className="flex flex-col items-center space-y-4 gap-8">
            <Link to="/menu">
              <button className="w-64 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                Start Order
              </button>
            </Link>
            <Link to="/orderhistory">
              <button className="w-64 bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                Order History
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
