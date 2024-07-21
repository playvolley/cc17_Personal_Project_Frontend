/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import cartApi from "../apis/cart";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const resCart = await cartApi.get();
        setCartItems(resCart.data);
        updateCart(resCart.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  const updateCart = useCallback((items) => {
    const newTotalPrice = items.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    const newTotalQuantity = items.reduce((acc, item) => acc + item.amount, 0);

    setTotalPrice(newTotalPrice);
    setTotalQuantity(newTotalQuantity);
  }, []);

  const handleDelete = useCallback(
    async (cartId) => {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8888/cart/${cartId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedItems = cartItems.filter((item) => item.id !== cartId);
        setCartItems(updatedItems);
        updateCart(updatedItems);
      } catch (err) {
        console.error("Error deleting item:", err.message);
      }
    },
    [cartItems, updateCart]
  );

  const deleteAllCartItems = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8888/cart/delAll/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems([]);
      updateCart([]);
    } catch (err) {
      console.error("Error deleting all cart items:", err.message);
    }
  }, [user.id, updateCart]);

  const updateQuantity = useCallback(
    (id, newQuantity) => {
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, amount: newQuantity } : item
      );
      setCartItems(updatedItems);
      updateCart(updatedItems);
    },
    [cartItems, updateCart]
  );

  const handlePlaceOrder = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const orderData = {
        userId: user.id,
        tableId: 1,
        data: cartItems.map((item) => ({
          product_id: item.product_id,
          amount: item.amount,
          price: item.price * item.amount,
        })),
      };

      const response = await axios.post(
        "http://localhost:8888/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      deleteAllCartItems();
      console.log("Order placed successfully:", response.data);
      navigate("/order");
    } catch (error) {
      console.error("Error placing the order:", error);
    }
  }, [cartItems, deleteAllCartItems, navigate, user.id]);

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">ตะกร้าของฉัน</h1>
        {cartItems.length === 0 ? (
          <p className="text-3xl text-center">กรุณากด + สินค้าก่อน...</p>
        ) : (
          <div className="container mx-auto">
            <h2 className="text-xl mb-4">สรุปรายการสินค้า</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleDelete={handleDelete}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="items-center flex flex-col gap-1 py-4">
          <span className="text-xl">
            ราคาทั้งหมด: {totalPrice.toFixed(2)} บาท
          </span>
          <span className="text-xl">จำนวนทั้งหมด: {totalQuantity} ชิ้น</span>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="flex items-center justify-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
