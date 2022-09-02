const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const orderRouter = require('./routes/my-order')
const orderStatisticsRouter = require('./routes/order-statistics')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cors')())

app.use('/', indexRouter);
app.use('/api', orderRouter);
app.use('/api/order-statistics', orderStatisticsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
}

module.exports = app;
