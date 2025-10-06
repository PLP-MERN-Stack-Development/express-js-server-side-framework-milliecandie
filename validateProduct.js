// middleware/validateProduct.js
module.exports = (req, res, next) => {
  const { name, description, category, price, inStock } = req.body;
  if (!name || !description || !category || price === undefined || inStock === undefined) {
    return res.status(400).json({ message: 'Validation Error: All fields are required' });
  }
  next();
};