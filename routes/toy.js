const express = require('express');
const ToyModel = require('../models/ToyModel');
const CategoryModel = require('../models/CategoryModel');
const router = express.Router();

// READ feature
router.get('/', async (req, res) => {
   try {
      const toyList = await ToyModel.find({}).populate('category');
      res.render('toy/index', { toyList });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// DELETE feature
router.get('/delete/:id', async (req, res) => {
   try {
      const productId = req.params.id;
      await ToyModel.findByIdAndDelete(productId);
      res.redirect('/toy');
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

router.get('/deleteall', async (req, res) => {
   try {
      await ToyModel.deleteMany();
      res.redirect('/toy');
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Render "Add toy" form
router.get('/add', async (req, res) => {
   try {
      const categories = await CategoryModel.find({});
      res.render('toy/add', { categories });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Add toy to the database
router.post('/add', async (req, res) => {
   try {
      const toy = req.body;
      await ToyModel.create(toy);
      res.redirect('/toy');
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Render "Edit toy" form
router.get('/edit/:id', async (req, res) => {
   try {
      const productId = req.params.id;
      const toy = await ToyModel.findById(productId);
      const categories = await CategoryModel.find({});
      res.render('toy/edit', { toy, categories });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Update toy in the database
router.post('/edit/:id', async (req, res) => {
   try {
      const productId = req.params.id;
      const updatedToy = req.body;
      let toy;
      toy = await ToyModel.findByIdAndUpdate(productId, updatedToy);
      console.log(toy);
      res.redirect('/toy');
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Show toy detail
router.get('/detail/:id', async (req, res) => {
   try {
      const productId = req.params.id;
      const toy = await ToyModel.findById(productId);
      res.render('toy/detail', { toy });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Show toy list (customer layout)
router.get('/list', async (req, res) => {
   try {
      const toys = await ToyModel.find({});
      res.render('toy/list', { toys });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Search by toy name
router.post('/search', async (req, res) => {
   try {
      const keyword = req.body.keyword;
      const toys = await ToyModel.find({ name: new RegExp(keyword, "i") });
      res.render('toy/index', { toyList: toys });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Sort by toy id ascending
router.get('/sortid/ascending', async (req, res) => {
   try {
      const toyList = await ToyModel.find().sort({ productId: 1 });
      res.render('toy/index', { toyList });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

// Sort by toy id descending
router.get('/sortid/descending', async (req, res) => {
   try {
      const toyList = await ToyModel.find().sort({ productId: -1 });
      res.render('toy/index', { toyList });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
});

module.exports = router;
