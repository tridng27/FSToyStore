const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minLength: 3
      },
      quantity: {
         type: Number,
         min: 15,
         max: [30, 'Max quantity for a category is 30 products']
      }
   }
);
const CategoryModel = mongoose.model("categories", CategorySchema);
module.exports = CategoryModel;