const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri=process.env.MONGO_URI;
console.log("ser",uri);

mongoose.connect(process.env.MONGO_URI, {
  
  
 
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/workers', require('./routes/worker'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
