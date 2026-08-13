const express = require('express');
const router = express.Router();
const products = require('../data/product.js');

router.get('/', (req, res) => {
    res.send(products);
});

router.get('/:id', (req, res) => {
    const search = req.params.id;
    const foundid = products.find((i) => {
        return i.id === Number(search);
    });

    if (foundid) {
        res.send(foundid);
    } else {
        res.send(`${foundid}번 상품은 없음.`);
    }
});

router.get('/category/:category', (req, res) => {
    const search = req.params.category;
    const filteredCategory = products.filter((i) => {
        return i.category === search;
    });
    res.send(filteredCategory);
});

router.get('/price/:min/:max', (req, res) => {
    const minPrice = Number(req.params.min);
    const maxPrice = Number(req.params.max);
    const filterPrice = products.filter((i) => {
        return i.price >= minPrice && i.price <= maxPrice;
    });

    if (filterPrice) {
        res.send(filterPrice);
    };
});

router.post('/', (req, res) => {
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newStock = req.body.stock;
    const newCategory = req.body.category;
    
    const newProduct = {
        id: newId,
        name: newName,
        price: newPrice,
        stock: newStock,
        category: newCategory
    };

    products.push(newProduct);
    res.send(newProduct);
});

router.put('/:id', (req, res) => {
    const target = Number(req.params.id);
    const newPrice = req.body.price;
    const newCategory = req.body.category;

    const foundidProduct = products.find((i) => {
        return i.id === target;
    })

    if (foundidProduct) {
        foundidProduct.price = newPrice;
        foundidProduct.category = newCategory;
        res.send(foundidProduct);
    } else {
        res.send("헤당 아이디의 상품은 없음");
    }
});

router.delete('/delete/:id', (req, res) => {
    const target = Number(req.params.id);
    const foundidProduct = products.findIndex((i) => {
        return i.id === target
    });

    if (foundidProduct != -1) {
        products.splice(foundidProduct, 1);
        res.send(`${target}번째 상품 삭제됨.`)
    } else {
        res.send("해당 아이디의 상품은 없음.")
    }
})
module.exports = router;