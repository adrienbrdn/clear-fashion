// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');
const inputReasonable = document.querySelector('#reasonable-select');
const spanNbProducts = document.querySelector('#nbProducts');
const spanP50Price = document.querySelector('#p50Price');
const spanP90Price = document.querySelector('#p90Price');
const spanP95Price = document.querySelector('#p95Price');


/**
 * Set global value
 * @param {Array} results - products to display
 * @param {Object} meta_data - pagination meta info
 */
const setCurrentProducts = ({results, meta_data}) => {
  currentProducts = results;
  currentPagination = meta_data;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [limit=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, limit = 12, brand = 'all', reasonable = false) => {
  try {
    let link_api = `https://clear-fashion-eta.vercel.app/products/search?page=${page}&limit=${limit}`;
    if(brand !== 'all'){
      link_api = `https://clear-fashion-eta.vercel.app/products/search?page=${page}&limit=${limit}&brand=${brand}`;
    }  
    if(reasonable === true){
      link_api += '&price=50';
    }
    console.log(link_api);
    console.log(selectSort.value);
    const response = await fetch(link_api);
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    return body.found;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.id}>
        <span>${product.brand}</span>
        <a href="${product.url_product}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount, pageSize} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
  spanP50Price.innerHTML = currentProducts.sort((a, b) => a.price - b.price)[Math.ceil(currentProducts.length * 0.5)].price;
  spanP90Price.innerHTML = currentProducts.sort((a, b) => a.price - b.price)[Math.ceil(currentProducts.length * 0.9)].price;
  spanP95Price.innerHTML = ((Math.ceil(currentProducts.length * 0.95) < currentProducts.length)) ? currentProducts.sort((a, b) => a.price - b.price)[Math.ceil(currentProducts.length * 0.95)].price : currentProducts.sort((a, b) => a.price - b.price)[currentProducts.length - 1].price;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value), selectBrand.value, inputReasonable.checked);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectPage.addEventListener('change', async (event) => {
  const products = await fetchProducts(parseInt(event.target.value), selectShow.value, selectBrand.value, inputReasonable.checked);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectBrand.addEventListener('change', async (event) => {
  const products = await fetchProducts(selectPage.value, selectShow.value, event.target.value, inputReasonable.checked);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

inputReasonable.addEventListener('change', async (event) => {
  const products = await fetchProducts(selectPage.value, selectShow.value, selectBrand.value, event.target.checked);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

