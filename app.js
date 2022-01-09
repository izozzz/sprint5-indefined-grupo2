const express = require('express');
const path = require('path')
const app = express();

app.use(express.static('public'));

app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine','ejs')

const mainRoutes = require('./src/routes/mainRoutes')
const productRoutes = require("./src/routes/productRoutes")
const userRoutes = require("./src/routes/userRoutes")



app.use('/', mainRoutes)
app.use('/products', productRoutes)
app.use('/', userRoutes)
app.use((req,res,next)=>{
    res.status(404).render('not-found')
    })

app.listen (process.env.PORT ||3000, ()=>{
    console.log('Servidor funcionando bien');
});

