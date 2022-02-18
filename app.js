if(process.env.NODE_ENV!=="production"){
	require('dotenv').config();
}

const express=require('express');
const ejsMate=require('ejs-mate');
const mongoose=require('mongoose');
const override=require('method-override');
const multer=require('multer');

const {storage}=require('./cloudinary/index');
const upload=multer({storage});

const app=express();

app.use(express.static('Public'));
app.use(express.urlencoded({extended:true}))
app.use(override('_method'));

app.set('view engine','ejs');
app.engine('ejs',ejsMate);

const dbUrl=process.env.DB_URL || 'mongodb://localhost:27017/Football';

mongoose.connect(dbUrl)
	.then(()=>{
		console.log('Database connected')
	})
	.catch(()=>{
		console.log('connection unsuccessfull')
	})

const controller=require('./controller/art');

app.get('/home',controller.home)

app.get('/register',(req,res)=>{
	res.render('register')
})

app.post('/register',upload.array('photo'),controller.register);

app.get('/edit/:id',controller.edit_get)

app.post('/edit/:id',controller.edit_post)

app.delete('/delete/:id/ArtGallery/:image',controller.delete)

const port=process.env.PORT || '8080';

app.listen(port,()=>{
	console.log(`server is listining on port:${port}`)
})