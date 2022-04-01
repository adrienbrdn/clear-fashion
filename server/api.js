const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;
const clientPromise = require('./mongo_client');
const { calculateLimitAndOffset, paginate } = require('paginate-info');
const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());


app.get('/find/products', async (request, response) => {
  const client = await clientPromise;
  const collection = await client.db(MONGODB_DB_NAME).collection(MONGODB_COLLECTION);

  const page = parseInt(request.query.page, 10) || 1;
  const size = parseInt(request.query.size, 10) || 12;
  

  const { limit, offset } = calculateLimitAndOffset(page, size);
  const count = await collection.count();

  await collection.find({}).sort({price: -1 }).skip(offset).limit(limit).toArray((error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send({"found": {"result": result, "meta_data": paginate(page, count, result, limit)}});
  });
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
