// index.js

/**
 * Required External Modules
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const scheduleRouter = require('./modules/schedule/routes');
const mailCron = require('./modules/schedule/crons/mailCron');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || '6005';
/**
 *  App Configuration
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(cors());

/**
 * Routes Definitions
 */
app.get('/', (req, res) => {
  res.render('index', { title: 'SendGrid Email Server' });
});
app.use('/api/schedule', scheduleRouter);

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Server Listening to requests on http://localhost:${port}`);
});
