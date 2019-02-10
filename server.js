const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const path=require('path');
require('./config/config');
const imageTest=require('./routers/imageTest/imageTest');
// const users=require('./routers/users/users');
const port=process.env.PORT || 8086;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'build')));
app.use('/api',imageTest);
// // app.use('/users',users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(port,()=>{
  console.log(`server is running at port ${port}...`);
});