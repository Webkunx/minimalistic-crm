const Product = require('../models/Product');

class ProductController {
  getAll(req, res) {
    Product.findAll()
      .then(product => res.send(product))
      .catch(err => console.log(err));
  }

  getById(req, res) {
    if (!req.params.id) return res.send(`You haven't provided id`);
    Product.findByPk(req.params.id)
      .then(product => {
        if (!product) return res.send(`Product with that id doesn't exist`);
        res.send(product);
      })
      .catch(err => res.send(err));
  }

  post(req, res) {
    Product.create({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price
    })
      .then(result => res.send(result))
      .catch(err => res.send(err));
  }

  put(req, res) {
    if (!req.params.id) return res.send(`You haven't provided id`);
    if (!req.body.name && !req.body.quantity && !req.body.price)
      return res.send(`You haven't provided data`);

    Product.findByPk(req.params.id)
      .then(product => {
        if (!product) return res.send(`Product with that id doesn't exist`);

        product
          .update({
            name: req.body.name || product.name,
            quantity: req.body.quantity || product.quantity,
            price: req.body.price || product.price
          })
          .then(product => res.send(product));
      })
      .catch(err => res.send);
  }

  delete(req, res) {
    if (!req.params.id) return res.send(`You haven't provided id`);
    Product.destroy({
      where: { id: req.params.id }
    })
      .then(product => {
        if (!product) return res.send(`Product with that id doesn't exist`);
        res.send(`Succesfully deleted product with id ${req.params.id}`);
      })
      .catch(err => res.send(err));
  }
}

module.exports = new ProductController();
