/* eslint-disable no-console, no-process-exit */
const fs = require('fs');
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse_paris = require('./sources/adresse_paris');
const montlimart = require('./sources/montlimart');
const mongo_storage = require('./mongo_storage');
const { calculateLimitAndOffset, paginate } = require('paginate-info');

async function sandbox () 
{
  try 
  {
    // Scraping data on the different websites

    // console.log(`Scraping data in progress`);

    // const dedi_products = await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/all-men');
    // const mont_products = await montlimart.scrape('https://www.montlimart.com/toute-la-collection.html?limit=all');
    // const adr_p1_products = await adresse_paris.scrape('https://adresse.paris/630-toute-la-collection?p=1');
    // const adr_p2_products = await adresse_paris.scrape('https://adresse.paris/630-toute-la-collection?p=2');


    // const full_dataset = dedi_products.concat(mont_products, adr_p1_products, adr_p2_products);
    // fs.writeFileSync("dataset.json", JSON.stringify(full_dataset));

    // console.log(dedi_products.length);
    // console.log(mont_products.length);
    // console.log(adr_p1_products.length);
    // console.log(adr_p2_products.length);

    // console.log(full_dataset.length);


    // Inserting the collected data into the MongoDB database

    // const result = await mongo_storage.insert(full_dataset);
    // console.log(result);

    // Querying the database

    // let query_Brand = { brand: 'adresse_paris' };
    // let query_Price = { price: { $lt: 20 } };
    // let query_sortBy_Price = [{ $sort : { 'price' : -1 } }];

    // const products_find = await mongo_storage.find(query_Brand);
    // console.log(products_find);
    // console.log(products_find.length);

    // const products_aggregate = await mongo_storage.aggregate(query_sortBy_Price); 
    // console.log(products_aggregate);

    
    var limit = 12;

    var {offset, limit} = calculateLimitAndOffset(4,limit);
    console.log(offset);
    console.log("\n",limit);
    console.log('done');
    process.exit(0);
  } 
  catch (e) 
  {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox();