const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */


const parse = data => {
  const $ = cheerio.load(data);

  return $('.product-container')
    .map((i, element) => {

      const brand = 'adresse_paris';

      const name = $(element)
      .find('.left-block .product_img_link')
      .attr('title');

      const price = parseFloat($(element)
      .find('.right-block .price.product-price')
      .text());

      // const material = $(element)
      // .find('.productList-image-materialInfo')
      // .text();
      
      const url_product = $(element)
      .find('.left-block .product_img_link')
      .attr('href');

      const image = $(element)
      .find('.left-block .product_img_link img')
      .attr('data-original');

      const id = $(element)
      .find('.right-block .button.ajax_add_to_cart_button.btn.btn-default')
      .attr('data-id-product');

      return {brand, name, price, url_product, image, id};
    })
    .get();
};
/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try 
  {
    const response = await fetch(url);
    if (response.ok) 
    {
      const body = await response.text();
      let products = parse(body);
      for(let i = 0; i < products.length; i++)
      {
        if(products[i]['name'] == undefined)
        {
          products.splice(i,1);
        }
      }
      return products;
    }
    else
    {
      console.error(response);
      return null;
    }
  } 
  catch (error) 
  {
    console.error(error);
    return null;
  }
};