/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleDelete, updateQuantity }) => {
  const [quantity, setQuantity] = useState(product.amount);
  const [totalPrice, setTotalPrice] = useState(product.price * product.amount);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice(newQuantity * product.price);
      updateQuantity(product.id, newQuantity);
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    if (quantity > 0 && quantity !== 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        setTotalPrice(newQuantity * product.price);
        updateQuantity(product.id, newQuantity);
        return newQuantity;
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 relative">
      <img
        src={product.product.image}
        alt={product.name}
        className="w-full h-24 object-cover mb-2"
      />
      <h3 className="text-lg font-medium mb-1">{product.name}</h3>
      <div className="flex items-center justify-between mt-4">
        <span className="text-lg font-bold">{totalPrice} บาท</span>
        <div className="flex items-center space-x-2">
          จำนวน &#160;
          <button
            onClick={decrementQuantity}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => handleDelete(product.id)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: "1.25rem" }} />
      </button>
    </div>
  );
};

export default ProductCard;
