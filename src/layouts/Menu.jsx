import { useEffect, useState } from "react";
import productApi from "../apis/product";
import cartApi from "../apis/cart";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.get();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const data = {
      user_id: user.id,
      product_id: product.id,
      name: product.name,
      amount: 1,
      price: product.price,
    };
    const response = await cartApi.post(data);
    console.log("response = ", response);
    console.log(`Add product ${product.id} to cart`);
    alert(`Added ${product.name}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <>
      <div className="p-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            onClick={() => addToCart(product)}
            key={product.id}
            className="border p-4 rounded-lg shadow-lg w-45 h-60 flex flex-col justify-center items-center relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700">฿{product.price}</p>
            <button className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              +
            </button>
          </div>
        ))}
      </div>
      <div className="border p-4 rounded-lg shadow-lg w-auto h-auto flex justify-center items-center relative">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-4">
          <Link to="/cart">Go to Cart</Link>
        </button>
      </div>
    </>
  );
}
