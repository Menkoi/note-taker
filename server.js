const express = require('express');
const app = express();

// To run on server
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//parese incomming string / array data
app.use(express.urlencoded({ extended: true }));
//parse JSON
app.use(express.json());
app.use(express.static('public'));

// apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(3001, () => {
    console.log(`API server now on ${PORT}`);
});