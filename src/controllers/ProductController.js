const Product = require('../models/Product');

class ProductController {
  // get all products
  async readAll(req, res) {
    try {
      const prods = await Product.findAll();
      res.send(prods);
    } catch (err) {
      res.send(err);
    }
  }

  // get product by id
  async readById(req, res) {
    try {
      if (!req.params.id) return res.send(`You haven't provided id`);
      const prod = await Product.findByPk(req.params.id);
      if (!prod) return res.send(`Product with that id doesn't exist`);
      return res.send(prod);
    } catch (err) {
      return res.send(err);
    }
  }

  // create product
  async createProduct(req, res) {
    try {
      const data = {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
      };

      const prod = await Product.create(data);

      return res.send(prod);
    } catch (err) {
      return res.send(err);
    }
  }

  // update product
  async updateProduct(req, res) {
    try {
      if (!req.params.id) return res.send(`You haven't provided id`);
      if (!req.body.name && !req.body.quantity && !req.body.price)
        return res.send(`You haven't provided data`);

      const prod = await Product.findByPk(req.params.id);

      if (!prod) return res.send(`Product with that id doesn't exist`);

      const prodUpdated = prod.update({
        name: req.body.name || prod.name,
        quantity: req.body.quantity || prod.quantity,
        price: req.body.price || prod.price
      });

      return res.send(prodUpdated);
    } catch (err) {
      return res.send(err);
    }
  }

  // delete product
  async destroyProduct(req, res) {
    try {
      if (!req.params.id) return res.send(`You haven't provided id`);

      const prod = await Product.destroy({
        where: { id: req.params.id }
      });

      if (!prod) return res.send(`Product with that id doesn't exist`);

      return res.send(`Succesfully deleted product with id ${req.params.id}`);
    } catch (err) {
      return res.send(err);
    }
  }
}

module.exports = new ProductController();
