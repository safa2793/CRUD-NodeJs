require('./connection')
const express = require('express');
const Comic_router = require ('./routers/comics')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/api/comics', Comic_router);
app.listen(port, () => console.log(`Server on ${port}`));