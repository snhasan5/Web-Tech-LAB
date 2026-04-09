let products = [
  { id: 1, name: 'Keyboard', price: 29.99 },
  { id: 2, name: 'Mouse', price: 14.99 },
];

function getAllProducts(req, res) {
  res.json({ success: true, data: products });
}

function getProductById(req, res) {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  return res.json({ success: true, data: product });
}

function createProduct(req, res) {
  const { name, price } = req.body;

  if (!name || typeof price !== 'number') {
    return res
      .status(400)
      .json({ success: false, message: 'name and numeric price are required' });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
  };

  products.push(newProduct);

  return res.status(201).json({ success: true, data: newProduct });
}

function updateProduct(req, res) {
  const productId = Number(req.params.id);
  const { name, price } = req.body;
  const index = products.findIndex((item) => item.id === productId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  if (!name || typeof price !== 'number') {
    return res
      .status(400)
      .json({ success: false, message: 'name and numeric price are required' });
  }

  products[index] = { id: productId, name, price };

  return res.json({ success: true, data: products[index] });
}

function deleteProduct(req, res) {
  const productId = Number(req.params.id);
  const beforeLength = products.length;
  products = products.filter((item) => item.id !== productId);

  if (products.length === beforeLength) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  return res.json({ success: true, message: 'Product deleted successfully' });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
