var router = require('express').Router();
var Category = require('../models/category');
var Product = require('../models/product');


router.get('/add-category', function(req, res, next){
  res.render('admin/add-category',{ message: req.flash('success')});
});

router.post('/add-category', function(req, res, next){
  var category = new Category();
  category.name = req.body.name;

  category.save(function(err){
    if(err) return next (err);
    req.flash('success', 'Successfuly added a category');
    return res.redirect('/add-category');
  });
})

router.get('/add-product', function(req, res, next){
  res.render('admin/add-product',{ message: req.flash('success')});
});

router.post('/add-product', function(req, res, next){
  var product = new Product();
  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = req.body.image;
  product.about = req.body.about;

  product.save(function(err){
    if(err) return next (err);
    req.flash('success', 'Successfuly added the product');
    return res.redirect('/add-product');
  });
})

module.exports = router;
