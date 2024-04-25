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

// Render edit category form
router.get('/edit/:id', async (req, res) => {
   try {
      const categoryId = req.params.id;
      const category = await CategoryModel.findById(categoryId);
      res.render('category/edit', { category });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Update category
router.post('/edit/:id', async (req, res) => {
   try {
      const categoryId = req.params.id;
      const { name, quantity } = req.body;
      // Find the category by ID and update its properties
      await CategoryModel.findByIdAndUpdate(categoryId, { name, quantity });
      res.redirect('/category');
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

module.exports = router;