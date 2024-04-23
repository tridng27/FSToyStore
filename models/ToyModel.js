//declare mongoose
var mongoose = require('mongoose');
//declare schema (table design/structure)
var ToySchema = mongoose.Schema(
   {
      productId: String,
      productName: String,
      addDate: Date,   
      quantity: Number,         
      image: String,
      category: String,
      //1 class - many students
      category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'categories'
      }
   }
);
//declare model (to be used in routes - controllers)
var ToyModel = mongoose.model("toys", ToySchema);  //students: collection name
//Note: in case collection name is single form (without "s" at the end)
//var StudentModel = mongoose.model("sinh vien", StudentSchema, "student");
//export module
module.exports = ToyModel;