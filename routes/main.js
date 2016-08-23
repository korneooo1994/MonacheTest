var router = require('express').Router();
var User = require('../models/user');
var Product = require('../models/product');
var redirect = require("express-redirect");
var express = require('express');




Product.createMapping(function(err, mapping){
  if (err) {
    console.log("error creating mapping");
    console.log(err);
  } else{
    console.log("Mapping created");
    console.log(mapping);
  }
});

var stream = Product.synchronize();
var count = 0;

stream.on('data', function() {
  count++;
});
stream.on('close', function() {
  console.log("Indexed" + count + " documents");
});
stream.on('error', function() {
  console.log(err);
});

router.post('/search', function(req, res, next){
  res.redirect('/search?q=' + req.body.q);
});

router.get('/search', function(req, res, next){
  if (req.query.q){
    Product.search({
      query_string: {query: req.query.q}
    }, function(err, results){
      if (err) return next(err);
      var data = results.hits.hits.map(function(hit){
        return hit;
      });
      res.render('main/search-result',{
        query: req.query.q,
        data: data
      });
    });
  }
});


router.get('/contact', function(req, res){
  res.render('main/contact');
});

router.get('/', function(req, res, next){
res.render('main/home');

});

router.get('/inne', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b5dadfd8db44e00a939c90'})
  .skip()
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);

   res.render('main/inne', {
      products: products,


   });
  });
});
router.get('/inne-2', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b5dadfd8db44e00a939c90'})
  .skip(20)
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);
   res.render('main/inne-2', {
      products: products,


   });
  });
});

router.get('/kolczyki', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b4a68b730e8a741334632a'})
  .skip()
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);

   res.render('main/kolczyki', {
      products: products,


   });
  });
});
router.get('/kolczyki-2', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b4a68b730e8a741334632a'})
  .skip(20)
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);
   res.render('main/kolczyki-2', {
      products: products,


   });
  });
});
router.get('/bransoletki', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b4ae92da98287c0409d77e'})
  .skip()
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);

   res.render('main/bransoletki', {
      products: products,


   });
  });
});
router.get('/bransoletki-2', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b4ae92da98287c0409d77e'})
  .skip(20)
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);
   res.render('main/bransoletki-2', {
      products: products,


   });
  });
});

router.get('/wisiorki', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b4ae9ada98287c0409d77f'})
  .skip()
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);

   res.render('main/wisiorki', {
      products: products,


   });
  });
});
router.get('/wisiorki-2', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b4ae9ada98287c0409d77f'})
  .skip(20)
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);
   res.render('main/wisiorki-2', {
      products: products,


   });
  });
});

router.get('/komplety', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b4aea6da98287c0409d780'})
  .skip()
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);

   res.render('main/komplety', {
      products: products,


   });
  });
});
router.get('/komplety-2', function(req, res, next){
  var perPage = 20;
  var page = req.params.page;

  Product
  .find({ category: '57b4aea6da98287c0409d780'})
  .skip(20)
  .limit(perPage)
  .populate('category')
  .exec(function(err, products){
    if(err) return next(err);
   res.render('main/komplety-2', {
      products: products,


   });
  });
});



router.get('/product/:id', function(req, res, next){
  Product.findById({ _id: req.params.id}, function(err, product){
    if(err) return next(err);
    res.render('main/product', {
      product: product
    });
  });
});

module.exports = router;
