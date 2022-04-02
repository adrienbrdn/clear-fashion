const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;
const clientPromise = require('./mongo_client');
const { calculateLimitAndOffset, paginate } = require('paginate-info');
const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';

const app = express();


app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', async (request, response) => {
  const client = await clientPromise;
  const collection = client.db(MONGODB_DB_NAME).collection(MONGODB_COLLECTION);
  response.send({'ack': true});
});

// app.get('/products/:id', async (request, response) => {
//   const client = await clientPromise;
//   const collection = client.db(MONGODB_DB_NAME).collection(MONGODB_COLLECTION);

//   var id;

//   if(request.params.id !== undefined){
//     id = request.params.id;
//   }  

//   console.log(request.params);

//   await collection.find({ _id: id }).toArray((error, product) => {
//     if(error) {
//         return response.status(500).send(error);
//     } 
//     response.send(product);
//   });
// });


app.get('/products/search', async (request, response) => {
  const client = await clientPromise;
  const collection = client.db(MONGODB_DB_NAME).collection(MONGODB_COLLECTION);

  const page = parseInt(request.query.page) || 1;
  var limit = parseInt(request.query.limit) || 12;
  var{offset, limit} = calculateLimitAndOffset(page, limit);

  const query = {};
  var brand, price;

  if(request.query.price !== undefined){
    price = parseInt(request.query.price);
    query['price'] = {$lt: price};
  }  

  if(request.query.brand !== undefined){
    brand = request.query.brand,
    query['brand'] = brand;
  }

  const count = await collection.find(query).sort({ price: 1 }).count();

  await collection.find(query).sort({ price: 1 }).skip(offset).limit(limit).toArray((error, results) => {
    if(error) {
        return response.status(500).send(error);
    }
    response.send({"found": {"results": results, "meta_data": paginate(page, count, results, limit)}, "success": true});
  });
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
module.exports = app;