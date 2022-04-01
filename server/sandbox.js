/* eslint-disable no-console, no-process-exit */
const fs = require('fs');
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse_paris = require('./sources/adresse_paris');
const montlimart = require('./sources/montlimart');

async function sandbox () 
{
  try 
  {
    console.log(`Scraping data in progress`);

    const dedi_products = await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/all-men');
    const mont_products = await montlimart.scrape('https://www.montlimart.com/toute-la-collection.html?limit=all');
    const adr_p1_products = await adresse_paris.scrape('https://adresse.paris/630-toute-la-collection?p=1');
    const adr_p2_products = await adresse_paris.scrape('https://adresse.paris/630-toute-la-collection?p=2');


    const full_dataset = dedi_products.concat(mont_products, adr_p1_products, adr_p2_products);
    fs.writeFileSync("./dataset.json", JSON.stringify(full_dataset, null, 4));

    // console.log(dedi_products.length);
    // console.log(dedi_products.length);
    // console.log(adr_p1_products.length);
    // console.log(adr_p2_products.length);

    console.log(full_dataset.length);

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

sandbox(eshop);
