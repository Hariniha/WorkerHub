const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {



}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/workers', require('./routes/worker'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
