import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ProductCard = ({ product, handleDelete, updateQuantity }) => {
  const [quantity, setQuantity] = useState(product.amount);
  const [totalPrice, setTotalPrice] = useState(product.price * product.amount);

  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleDeleteEvent = () => {
    handleDelete(product.id);
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
        <span className="text-lg font-bold">{totalPrice.toFixed(2)} บาท</span>
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
        onClick={handleDeleteEvent}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: "1.25rem" }} />
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    product: PropTypes.shape({
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};
export default ProductCard;
