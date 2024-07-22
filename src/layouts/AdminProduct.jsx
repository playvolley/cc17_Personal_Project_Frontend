import { useEffect, useState } from "react";
import productApi, {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../apis/product";
export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    price: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productApi.get();
      setProducts(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      if (newProduct.name && newProduct.price && newProduct.image) {
        const response = await addProduct(newProduct);
        setProducts([...products, response.data]);
        setNewProduct({ image: "", name: "", price: "" });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(editingProduct.id, editingProduct);
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? editingProduct : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>

      <div className="mb-6 flex flex-col md:flex-row items-center justify-center">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct?.image}
          onChange={handleInputChange}
          className="border p-2 m-2 w-full md:w-1/4"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct?.name}
          onChange={handleInputChange}
          className="border p-2 m-2 w-full md:w-1/4"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct?.price}
          onChange={handleInputChange}
          className="border p-2 m-2 w-full md:w-1/4"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white p-2 m-2 rounded"
        >
          Add Product
        </button>
      </div>

      <ul>
        {products?.map((product) => (
          <li
            key={product?.id}
            className="flex items-center justify-between mb-4 p-4 bg-white rounded shadow"
          >
            <div className="flex items-center">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div>
                <span className="font-bold text-lg">{product?.name}</span>
                <span className="block text-gray-500">
                  {product?.price} Baht
                </span>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product?.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div className="mt-6 p-4 bg-gray-200 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={editingProduct?.image}
              onChange={handleEditInputChange}
              className="border p-2 m-2 w-full md:w-1/4"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editingProduct?.name}
              onChange={handleEditInputChange}
              className="border p-2 m-2 w-full md:w-1/4"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editingProduct?.price}
              onChange={handleEditInputChange}
              className="border p-2 m-2 w-full md:w-1/4"
            />
            <button
              onClick={handleUpdateProduct}
              className="bg-green-500 text-white p-2 m-2 rounded"
            >
              Update Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
