const mongoose = require ('mongoose');
mongoose.set('useCreateIndex', true);

//connect with db 
mongoose.connect('mongodb+srv://rootlogin:rootlogin@cluster0.aapjg.mongodb.net/Comics?retryWrites=true&w=majority', 
{ useNewUrlParser :true, useUnifiedTopology : true})
        .then(()=> console.log('A Mongo connection has been made'))
        .catch((err)=> console.log(`Mongo is Down, raison : ${err.message}`))


