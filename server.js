const express = require('express');
const cors = require('cors');
const path =require('path')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');



//routers
const userRouter = require('./router/user.js'); 
const assetCategory =require('./router/assetCategory.js')
const asset =require('./router/asset.js')
const assetStatus =require('./router/assetStatus.js')
const repair  =require('./router/repair')

const app = express();
const port = 3005;

// CORS configuration
app.use(cors()); // Enable CORS for all routes


// Middleware for parsing application/json
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//set pug engiee
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './public'); 
app.set('view engine', 'pug')

// Link the user router for routes like /users
app.use('/users', userRouter);
app.use('/assetcategory',assetCategory)
app.use('/asset',asset)
app.use('/assetStatus',assetStatus)
app.use('/repair',repair)




app.get('/',(req,res)=>{
  res.status(200).render('view/user/index.pug')
})
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
