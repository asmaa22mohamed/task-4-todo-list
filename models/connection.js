const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err)
       console.error(err);
    else
       console.log("Connected to the mongodb"); 
  })
