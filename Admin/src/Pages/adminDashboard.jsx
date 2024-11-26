import React, { useState, useEffect } from 'react';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: []
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const API_BASE_URL = 'http://localhost:5002/admin'; // Adjust the base URL as per your server setup

  // Fetch all products using fetch
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/`);
      if (!res.ok) throw new Error('Failed to load products.');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setAlert({ message: 'Failed to load products.', type: 'error' });
    }
  };

  // Add or update product using fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    // Append data to FormData object
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        formData.images.forEach((image) => {
          formDataObj.append('images', image);
        });
      } else {
        formDataObj.append(key, formData[key]);
      }
    });

    try {
      const method = selectedProduct ? 'PUT' : 'POST';
      const url = selectedProduct ? `${API_BASE_URL}/${selectedProduct._id}` : `${API_BASE_URL}`;
      
      const res = await fetch(url, {
        method: method,
        headers: {
          // no 'Content-Type' header, since we are sending FormData
        },
        body: formDataObj,
      });

      if (!res.ok) throw new Error('Something went wrong. Please try again.');
      const message = selectedProduct ? 'Product updated successfully!' : 'Product added successfully!';
      setAlert({ message: message, type: 'success' });
      
      fetchProducts();
      setFormData({ name: '', description: '', price: '', category: '', stock: '', images: [] });
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      setAlert({ message: 'Something went wrong. Please try again.', type: 'error' });
    }
  };

  // Delete product using fetch
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product.');
      
      setAlert({ message: 'Product deleted successfully!', type: 'success' });
      fetchProducts();
    } catch (err) {
      console.error(err);
      setAlert({ message: 'Failed to delete product.', type: 'error' });
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload change
  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, images: Array.from(files) });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Alert messages */}
      {alert.message && (
        <div className={`alert ${alert.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {alert.message}
        </div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Starter">Starter</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
          <option value="Snack">Snack</option>
        </select>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <input
          type="file"
          name="images"
          onChange={handleImageChange}
          multiple
          required
        />
        
        {/* Display image previews */}
        <div className="image-previews">
          {formData.images && formData.images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />
          ))}
        </div>

        <button type="submit">{selectedProduct ? 'Update' : 'Add'} Product</button>
      </form>
      
      {/* Product List */}
      <div className="product-list">
        <h2>Your Products</h2>
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => setSelectedProduct(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
