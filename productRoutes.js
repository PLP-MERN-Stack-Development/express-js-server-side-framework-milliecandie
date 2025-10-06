// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

let products = [
  { id: 1, name: "Laptop", description: "A good laptop", category: "Tech", price: 500, inStock: true },
  { id: 2, name: "Book", description: "A great book", category: "Education", price: 20, inStock: true }
];

// GET all products (with filtering and pagination)
router.get('/', (req, res) => {
  const { category, page = 1, limit = 2 } = req.query;
  let filtered = products;
  if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + parseInt(limit));
  res.json(paginated);
});

// GET product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return next({ status: 404, message: 'Product not found' });
  res.json(product);
});

// POST create new product
router.post('/', auth, validateProduct, (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', auth, validateProduct, (req, res, next) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return next({ status: 404, message: 'Product not found' });
  Object.assign(product, req.body);
  res.json(product);
});

// DELETE product
router.delete('/:id', auth, (req, res, next) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return next({ status: 404, message: 'Product not found' });
  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// GET product statistics
router.get('/stats/count', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;