const mongoose = require('mongoose');

const connectionString = "mongodb+srv://admin:HcRhE7A0FoNjqAwm@cluster0.30bx91i.mongodb.net/appcertification";

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
