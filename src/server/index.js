const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const routes= require('./routes/todoRoute');

require ('dotenv').config();

const app =express();
const PORT = process.env.port|| 5000;

app.use(express.json());
app.use(cors());

// Pick up React index.html file
// this.app.use(
//     express.static(path.join(__dirname, "../client/build"))
//   );

mongoose
    .connect(process.env.MONGO_URL)    //currently using ./.env instead of ./src/.env
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));

app.use(routes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));


//rate-limit-express - a middleware to prevent api hacking