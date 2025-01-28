const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  notFoundMiddleware,
  errorHandlerMiddleware,
} = require('./middlewares/errorHandlers');

require('express-async-errors');
require('dotenv').config();
require('./config/db');

const app = express();
const port = 8080;

const route = require('./modules');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./public'));

app.use('/api/', route);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
