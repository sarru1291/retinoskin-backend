const express=require('express');
const router=express.Router();
const _=require('lodash');
const nodemailer=require('nodemailer');
const {User}=require('../../db/models/user.model');
const {authenticate}=require('../../db/middleware/user.authenticate.middleware');

router.get('/',(req,res)=>{
res.send('you have tried get methods');
});
// router.post('/', (req, res) => {
  
//   var userData = _.pick(req.body, ['username','email', 'password','phone','address']);
//   // console.log(userData);
//   var user = new User(userData);
//   user.save().then(() => {
//     return user.generateAuthToken();
//   }).then((token) => {
//     res.header('x-auth', token).send(user);
//   }).catch((e) => {
//     res.status(400).send(e);
//   });
  
// });

// router.get('/me',authenticate, (req, res) => {

// router.get('/me', (req, res) => {
//   res.send(req.user);
// });

// router.post('/login', (req, res) => {
//   var body = _.pick(req.body, ['email', 'password']);

//   User.findByCredentials(body.email, body.password).then((user) => {
//     return user.generateAuthToken().then((token) => {
//       res.header('x-auth', token).send(user);
//     });
//     // return res.send(user);
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });

// router.delete('/me/token', authenticate, (req, res) => {
//   router.delete('/me/token', (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send();
//   }, () => {
//     res.status(400).send();
//   });
// });
// router.post('/message',authenticate,(req,res)=>{
router.post('/message',(req,res)=>{
  var body = _.pick(req.body, ['modelOutput', 'imageUploadedUrl','to']);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sarru1291@gmail.com',
      pass: 'bome@@@@'
    }
  });
  
  var mailOptions = {
    from: 'sarru1291@gmail.com',
    to: 'sauravansh17@gmail.com',
    subject: 'Disease Status',
    text:"Model Output: "+ body.modelOutput+" Image url: "+body.imageUploadedUrl
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.send('Message sent successfully');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Message sent successfully');
    }
  });
});
module.exports=router;