const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const auth_routes = require('./routes/auth');

// Express Boilerplate
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    // res.json({text: 'Hello, world'})
})

app.use('/auth', auth_routes)

app.listen(PORT);
