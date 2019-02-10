# retinoskin-backend

## REST-APIs for RetinoSkin

POST    /users/message    
  > {
	  "modelOutput":"bening",
	  "imageUploadedUrl":"https://res.cloudinary.com/example/image/upload/v1549610777/retinoskin/test-photos/ISIC_0000003.jpg",
	  "to":"example@gmail.com"
    }
    
POST    /api/uploadImage?option=
  > params(option): retinopathy or cancer
  multipart: form-data
  
GET   /api/model
  > params
  option: retinopathy or skin cancer
  url: https://res.cloudinary.com/example/image/upload/v1549610777/retinoskin/test-photos/ISIC_0000003.jpg


   
