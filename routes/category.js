const express = require('express');
const router = express.Router();
const ToyModel = require('../models/ToyModel');
const CategoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
   let categoryList = await CategoryModel.find({});
   res.render('category/index', { categoryList });
})

router.get('/delete/:id', async (req, res) => {
   await CategoryModel.findByIdAndDelete(req.params.id);
   res.redirect('/category');
})


module.exports = router;