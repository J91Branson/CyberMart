var express = require("express");
var app = express();
var axios = require("axios");
var cheerio = require("cheerio");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get("/scrape/:id", function (req, res) {
  var id = req.params.id;

  axios.get("https://www.google.com/shopping/product/" + id).then(function (response) {
    var $ = cheerio.load(response.data);
    var product = {};
    var arr = [];
    product.name = $("#product-name").text();
    product.price = $("#summary-prices")
      .children("span")
      .children("span").text();
    product.quantity = getRandomInt(100);
    product.sold = getRandomInt(20);
    $(".os-row").each(function (i, element) {
      var origin = {};
      origin.store = $(this)
        .children(".os-seller-name")
        .children(".os-seller-name-primary")
        .children()
        .text();
      origin.price = $(this)
        .children(".os-price-col")
        .children(".tiOgyd")
        .text();
      arr.push(origin);
    });
    product.allPrices = arr;
    return res.json(product);
  });
});

module.exports = app;