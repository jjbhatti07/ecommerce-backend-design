import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ setPage }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stock: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add products');
        setLoading(false);
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Product added successfully!');
      setForm({ name: '', price: '', category: '', image: '', description: '', stock: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto bg-white border border-[#DEE2E7] rounded-xl p-8 shadow-sm">
        
        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Add New Product</h2>
        <p className="text-[#8B96A5] text-sm mb-6">Fill in the details to add a new product</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm mb-4">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Price ($)</label>
              <input
                type="number"
                name="price"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Stock</label>
              <input
                type="number"
                name="stock"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Select category</option>
              <option value="tech">Tech</option>
              <option value="cloth">Clothing</option>
              <option value="interior">Interior</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
            <button
              onClick={() => setPage('listing')}
              className="flex-1 bg-white border border-[#DEE2E7] text-[#1C1C1C] py-3 rounded-lg font-bold hover:bg-[#F7FAFC] transition-colors"
            >
              View Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;