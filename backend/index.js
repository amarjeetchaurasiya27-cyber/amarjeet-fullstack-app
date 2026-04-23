const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello Kailash Sir, Best Of Luck For Your Journey!</h1><p>Ye Meri apni banayi hui Node.js Application hai.</p>');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});