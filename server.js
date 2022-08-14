const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bucketListItemRoutes = require('./routes/api/bucketLIstItems');
const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

try {
    mongoose.connect(mongoUri)
    console.log('MongoDB database Connected ...')
} catch (error) {
    console.log(error);
    handleError(error);
}

app.use('/api/bucketListItems', bucketListItemRoutes);

// app.get('/', (req, res) => res.send('Hello world'));
if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    });
}

app.listen(PORT, () => console.log(`\nApp listening at http://localhost:${PORT}...`));