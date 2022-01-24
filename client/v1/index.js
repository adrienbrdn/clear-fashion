// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

const cheapestTshirt = 'https://www.loom.fr';
console.log(cheapestTshirt);



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

const marketplaceSize = marketplace.length;
console.log(marketplaceSize);


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

let brandsName = []
for(let i = 0; i < marketplaceSize; i++)
{
  if(!brandsName.includes(marketplace[i].brand))
  {
    brandsName.push(marketplace[i].brand);
  }
}
console.log(brandsName);


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

function CopyArray(toClone)
{
  let clone = [];
  for (let i = 0; i < toClone.length; i++) 
  {
    clone[i] = toClone[i];
  }
  return clone;
}

function SortByPriceAsc(products)
{
  return products.sort((a, b) => a.price - b.price);
}
let sorted_price_marketplace = CopyArray(marketplace);
SortByPriceAsc(sorted_price_marketplace);
console.log(sorted_price_marketplace);


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function SortByDateDesc(products)
{
  return products.sort((a, b) => -(new Date(a.date) - new Date(b.date)));
}
let sorted_date_marketplace = CopyArray(marketplace);
SortByDateDesc(sorted_date_marketplace);
console.log(sorted_date_marketplace);



// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

let productsSpecificPrice = []
for(let i = 0; i < marketplaceSize; i++)
{
  if(marketplace[i].price >= 50 && marketplace[i].price <= 100)
  {
    productsSpecificPrice.push(marketplace[i]);
  }
}
console.log(productsSpecificPrice);




// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

let sum = 0;
for(let i = 0; i < marketplaceSize; i++)
{
  sum += marketplace[i].price;
}
let avgPrice = sum / marketplaceSize;
console.log(avgPrice);




/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

let dictBrands = {};
for(let i = 0; i < brandsName.length;i++)
{
  let listProducts = [];
  for(let j = 0; j < marketplaceSize; j++)
  {
    if(marketplace[j].brand == brandsName[i])
    {
      listProducts.push(marketplace[j]);
    }
  }
  dictBrands[brandsName[i]] = listProducts;
}

console.log(dictBrands);

for(let key in dictBrands)
{
  console.log("Marque: " + key + " => Number of products: " + dictBrands[key].length);
}



// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

function CopyDict(toClone) 
{
  let clone = {}; 
  for(let key in toClone) 
  {
    clone[key] = toClone[key];
  }
  return clone;
}

function SortByPriceDesc(products)
{
  return products.sort((a, b) => -(a.price - b.price));
}

let dictBrands_Price = CopyDict(dictBrands);
for(let key in dictBrands_Price)
{
  SortByPriceDesc(dictBrands_Price[key]);
}
console.log(dictBrands_Price);





// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

function SortByDateAsc(products)
{
  return products.sort((a, b) => new Date(a.date) - new Date(b.date));
}

let dictBrands_Date = CopyDict(dictBrands);
for(let key in dictBrands_Date)
{
  SortByDateAsc(dictBrands_Date[key]);
}
console.log(dictBrands_Date);




/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products


for(let key in dictBrands)
{
  SortByPriceAsc(dictBrands[key]);
  let ind_p90 = Math.ceil(dictBrands[key].length * 0.9) - 1;
  console.log("Marque: " + key + " => p90: " + dictBrands[key][ind_p90].price)
}


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]
// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

let new_products = true;
for(let i = 0; i < COTELE_PARIS.length && new_products; i++)
{
  let nb_jours = Math.ceil(new Date("2022-01-24") - new Date(COTELE_PARIS[i].released)) / (1000 * 3600 * 24);
  if(nb_jours > 14)
  {
    new_products = false;
  }
}
console.log("New products ? " + new_products);


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

let reasonable_price = true;
for(let i = 0; i < COTELE_PARIS.length && reasonable_price; i++)
{
  if(COTELE_PARIS[i].price > 100)
  {
    reasonable_price = false;
  }
}
console.log("Reasonable price shop ? " + reasonable_price);


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

let product = COTELE_PARIS.find(elmt => elmt.uuid == `b56c6d88-749a-5b4c-b571-e5b5c6483131`);
console.log(product);

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

let without_that = CopyArray(COTELE_PARIS);
for(let i = 0; i < without_that.length; i++)
{ 
  if(without_that[i].uuid === `b56c6d88-749a-5b4c-b571-e5b5c6483131`)
  { 
    without_that.splice(i, 1); 
  }    
}
console.log(without_that);

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables

console.log(blueJacket);
console.log(jacket);

// 2. What do you notice?
// The new property 'favorite' appears also in the 'blueJacket' variable.

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket = Object.assign({}, blueJacket);
jacket.favorite = true;
console.log(blueJacket);
console.log(jacket);


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

let localStorage = Object.assign([], MY_FAVORITE_BRANDS);
console.log(localStorage)
