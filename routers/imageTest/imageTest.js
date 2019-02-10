const express=require('express');
const router=express.Router();
const cloudinary=require('cloudinary');
const formidable=require('formidable');
const axios=require('axios');
require('../../config/config');
// 
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

function uploadImage(files) {
  return new Promise((resolve,reject)=>{
    cloudinary.v2.uploader.upload(
      files.image.path, 
      {folder:"retinoskin/notLoggedInUsers/"},
      function (error,result) {
        if(result){
          resolve(result)
        }else{
          reject()
        }
      });
  });
}
function modelOutput(imageURL,option) {
    try {
      return axios.post('https://retinoskin-model.herokuapp.com/api/model/test',{
      // return axios.post('http://localhost:5000/api/model/test',{
        "url":imageURL,
        "option":option
      })
    } catch (error) {
      console.error(error)
    }
}
const modelProcess=async(urlImage,option,res)=>{
  modelOutput(urlImage,option)
    .then(response=>{
      res.json({"diseaseResult":response.data});
    })
    .catch(error=>{
      let out={'output':{
        "msg":"Model: heroku Internal Server Error."
      }};
      res.json({"diseaseResult":out})
    })
}
router.post('/uploadImage',(req,res)=>{
  let option=req.query.option;
  if (option==='') {
    output={
      imageUploadedStatus:'No parameter(option).'
    }
    res.json({
      "output":output
    });
  }else{
      var form = new formidable.IncomingForm();
      form.encoding='utf-8';
      form.keepExtensions=true;
        form.parse(req, function (err, fields, files) {  
          uploadImage(files).then((result)=>{
            console.log("Image Upload to Cloudinary.");
            output={
              imageUploadedStatus:'Image Uploaded',
              imageUploadedUrl:result.url,
              imageUploadedOption:option
            }
            res.json({"output":output});
            // modelProcess(result,option,res)
          },(error)=>{
            console.log(error);
            output={
              imageUploadedStatus:'Image Upload Failed.'
            }
            res.json({
              "output":output
            });
          })
        });
  }
});

router.get('/model',(req,res)=>{
  let option=req.query.option;
  let urlIm=req.query.url;
  if (option==='') {
    let out={'output':{
      "msg":"No paramter(option)"
    }};
    res.json({"diseaseResult":out});
  }else{
      modelProcess(urlIm,option,res)
  }
});

module.exports=router;
