const express = require('express');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();


const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
};


router.post('/', authenticateJWT, async (req, res) => {
    const { name, price, description, category, imageUrl } = req.body;
    try {
        const product = new Product({ name, price, description, category, imageUrl });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).send({ message: 'Error creating product.', error });
    }
});


router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(400).send({ message: 'Error fetching products.', error });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send({ message: 'Product not found.' });
        res.json(product);
    } catch (error) {
        res.status(400).send({ message: 'Error fetching product.', error });
    }
});


router.put('/:id', authenticateJWT, async (req, res) => {
    const { name, price, description, category, imageUrl } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { name, price, description, category, imageUrl },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).send({ message: 'Product not found.' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send({ message: 'Error updating product.', error });
    }
});


router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).send({ message: 'Product not found.' });
        res.status(204).send();
    } catch (error) {
        res.status(400).send({ message: 'Error deleting product.', error });
    }
});

module.exports = router;
