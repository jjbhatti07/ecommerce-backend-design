const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const products = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "High quality wireless headphones with noise cancellation",
    stock: 50,
    rating: 4.5
  },
  {
    name: "Smart Watch",
    price: 199.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "Feature packed smart watch with health tracking",
    stock: 30,
    rating: 4.3
  },
  {
    name: "Bluetooth Speaker",
    price: 59.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Portable bluetooth speaker with 360 degree sound",
    stock: 45,
    rating: 4.4
  },
  {
    name: "Laptop Pro",
    price: 999.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    description: "High performance laptop for professionals",
    stock: 15,
    rating: 4.7
  },
  {
    name: "Smartphone X",
    price: 699.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    description: "Latest smartphone with amazing camera and battery life",
    stock: 25,
    rating: 4.6
  },
  {
    name: "Gaming Mouse",
    price: 49.99,
    category: "tech",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    description: "High precision gaming mouse with RGB lighting",
    stock: 60,
    rating: 4.2
  },
  {
    name: "Running Shoes",
    price: 79.99,
    category: "cloth",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Comfortable running shoes for everyday use",
    stock: 100,
    rating: 4.7
  },
  {
    name: "Laptop Backpack",
    price: 49.99,
    category: "cloth",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    description: "Spacious laptop backpack with multiple compartments",
    stock: 75,
    rating: 4.2
  },
  {
    name: "Men's Jacket",
    price: 89.99,
    category: "cloth",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500",
    description: "Stylish and warm jacket for all seasons",
    stock: 40,
    rating: 4.3
  },
  {
    name: "Women's Dress",
    price: 59.99,
    category: "cloth",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
    description: "Elegant dress perfect for any occasion",
    stock: 55,
    rating: 4.5
  },
  {
    name: "Sports T-Shirt",
    price: 29.99,
    category: "cloth",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Breathable sports t-shirt for workouts",
    stock: 120,
    rating: 4.1
  },
  {
    name: "Desk Lamp",
    price: 39.99,
    category: "interior",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    description: "Modern LED desk lamp with adjustable brightness",
    stock: 60,
    rating: 4.4
  },
  {
    name: "Coffee Maker",
    price: 149.99,
    category: "interior",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    description: "Automatic coffee maker with built-in grinder",
    stock: 25,
    rating: 4.6
  },
  {
    name: "Sofa Chair",
    price: 299.99,
    category: "interior",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    description: "Comfortable modern sofa chair for your living room",
    stock: 10,
    rating: 4.8
  },
  {
    name: "Wall Clock",
    price: 24.99,
    category: "interior",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500",
    description: "Minimalist wall clock for modern homes",
    stock: 80,
    rating: 4.0
  },
  {
    name: "Ceramic Vase",
    price: 34.99,
    category: "interior",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500",
    description: "Beautiful ceramic vase for home decoration",
    stock: 35,
    rating: 4.3
  }
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await Product.deleteMany();
    console.log('Products cleared');
    await Product.insertMany(products);
    console.log('Sample products added!');
    await mongoose.connection.close();
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.log('Error:', err.message);
    process.exit(1);
  }
}

seedDB();