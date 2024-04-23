var express = require('express');
const ToyModel = require('../models/ToyModel');
const CategoryModel = require('../models/CategoryModel');
var router = express.Router();

//READ feature
//Importance: Must use "async" + await" keywords
router.get('/', async (req, res) => {
   //SQL: SELECT * FROM students
   var toyList = await ToyModel.find({}).populate('category');
   console.log(toyList);
   //console.log(studentList);
   res.render('toy/index', { toyList });
});

//DELETE feature
router.get('/delete/:id', async (req, res) => {
   //get id from url
   let productId = req.params.id;
   //delete document in collection by id
   //SQL: DELETE FROM students WHERE id = "id"
   await ToyModel.findByIdAndDelete(productId);
   //console.log("Delete student succeed !");
   //redirect to student list page
   res.redirect('/toy');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM students
   //SQL: TRUNCATE TABLE students
   await ToyModel.deleteMany();
   res.redirect('/toy');
})

//step 1: render "Add student" form for user to input data
router.get('/add', async (req, res) => {
   var categories = await CategoryModel.find({});
   res.render('toy/add', { categories });
})

//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   //get input data from form
   var toy = req.body;
   console.log(toy);
   //add data to database
   await ToyModel.create(toy);
   //redirect to student homepage
   res.redirect('/toy');
})

router.get('/edit/:id', async (req, res) => {
   var productId = req.params.id;
   var toy = await ToyModel.findById(id);
   res.render('toy/edit', { toy });
})

router.post('/edit/:id', async (req, res) => {
   var productId = req.params.id;
   var toy = req.body;
   await ToyModel.findByIdAndUpdate(productId,toy);
   res.redirect('/toy');
})

//show student detail
router.get('/detail/:id', async (req, res) => {
   let productId = req.params.id;
   var toy = await ToyModel.findById(productId);
   res.render('toy/detail', { toy });
})

//show student list (customer layout)(
router.get('/list', async (req, res) => {
   var toys = await ToyModel.find({});
   res.render('toy/list', { toys });
})

//search by student name
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let toys = await ToyModel.find({ name: new RegExp(keyword, "i") });
   res.render('toy/index', { toyList : toys });
})

//sort by student id ascending
router.get('/sortid/asc', async (req, res) => {
   let toyList = await ToyModel.find().sort({ name: 1 });
   res.render('toy/index', { toyList });
})

//sort by student id descending
router.get('/sortid/asc', async (req, res) => {
   let toyList = await ToyModel.find().sort({ name: -1 });
   res.render('toy/index', { toyList });
})

module.exports = router;