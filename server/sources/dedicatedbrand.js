const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {

      const brand = 'dedicated';

      const name = $(element)
      .find('.productList-title')
      .text()
      .trim()
      .replace(/\s/g, ' ');

      const price = parseFloat($(element)
      .find('.productList-price')
      .text());
      
      const url_product = 'https://www.dedicatedbrand.com' + $(element)
      .find('.productList-link')
      .attr('href');

      const image = $(element)
      .find('.productList-image img')
      .attr('data-src');

      const id = $(element)
      .find('.js-saveToFavorites.productList-favorites')
      .attr('data-id');

      return {brand, name, price, url_product, image, id};
    })
    .get();
};

const parsePagination = data => {
  const $ = cheerio.load(data);
  const nbDisplayed = parseInt($('.paging-showing .js-items-current').text());
  const nbTotal = parseInt($('.paging-showing .js-allItems-total').text());
  const tab = [nbDisplayed, nbTotal]
  return tab;
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
      const result = parsePagination(body);
      const nbPages = Math.ceil(result[1]/result[0]);
      let products = [];
      for (let page = 1; page <= nbPages; page++)
      {
        const new_url = 'https://www.dedicatedbrand.com/en/men/all-men?p=' + page.toString();
        try
        {
          const new_response = await fetch(new_url);
          if(new_response.ok)
          {
            const new_body = await new_response.text();
            products = products.concat(parse(new_body));
          }
          else
          {
            console.error(new_response);
            return null;
          }
        }
        catch (error) 
        {
          console.error(error);
          return null;
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
