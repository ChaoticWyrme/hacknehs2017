// entry file
const express = require('express');
const app = express();

app.use(express.static('public'));
// app.get('/user', );
const server = app.listen(3000);
