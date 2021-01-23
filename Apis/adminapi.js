//create mini express
const exp=require("express")
const adminApiObj=exp.Router();

//import bcrypt
const bcrypt=require("bcryptjs");
//import json webtoken
const token=require("jsonwebtoken")

//import tokenverification
const verifyToken=require("../token/tokenverification")

//body parsing middleware to get json data
adminApiObj.use(exp.json());

//import modules
const cloudinary=require("cloudinary").v2;
const multer=require("multer");
const { CloudinaryStorage }=require("multer-storage-cloudinary");

//configure cloudinary
cloudinary.config({
    cloud_name:"dqjqrhjbh",
    api_key:"759956696947164",
    api_secret:"0StlRULiQQfa4OmsHx6ZiUB8wZM"
});

//configure storage setting
var clStorage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'MyFolder',
        format:async (req,file)=>('png','jpg'),//supports promises as well
        public_id: (req,file)=>file.fieldname + '-' + Date.now()
    },
});

//configure multer
var upload=multer({storage:clStorage});
//post req to register purchaser
adminApiObj.post("/register",upload.single("profilepic"),(req,res)=>{
      //get  image cdn links from cloudinary
let profilepic=req.file.path;
console.log("profile",profilepic)
let seller=JSON.parse(req.body.sellerData)
console.log("req body is",req.body.sellerData)
console.log("seller is",seller)
seller.profilepic=profilepic;
const sellerData=seller;
    //get data to register
    //let sellerData=req.body;
    //console.log(sellerData)
    //console.log(sellerData.name)
    //get collection
    let adminCollectionObj=req.app.get("adminCollectionObj")
    //find for duplicate user
    adminCollectionObj.findOne({name:sellerData.name})
    .then(user=>{
        if(user==null){
            bcrypt.hash(sellerData.password,6).then(hashedPassword=>{sellerData.password=hashedPassword;
                adminCollectionObj.insertOne(sellerData)
                .then((success)=>{res.send({message:"Registration is success"})})
                .catch(err=>console.log(err))})
            
        }
        else{
            res.send({message:"this name is already existed"})
        }
    })
    .catch(err=>{console.log(err)})
})

//user login
adminApiObj.post("/login",(req,res)=>{
    let sellerData=req.body;
    //console.log(sellerData);
    //search user by username
    //get collection
   let adminCollectionObj=req.app.get("adminCollectionObj")
    adminCollectionObj.findOne({name:sellerData.name},(err,sellerObj)=>{
        if(err){
            console.log("err is",err)
        }
        else if(sellerObj==null){
            //if username is not matched
            res.send({message:"Invalid name",status:"failed"})
        }
        else{
          //if username is matched then verify password using bcrypt
          bcrypt.compare(sellerData.password,sellerObj.password,(err,result)=>{
              if(err){
                  console.log(err)
              }
              else if(result==false){
                   res.send({message:"Invalid password",status:"failed"})
              }
              else{
                  //generate token as user is logged in successfully with correct credemtilaps
               token.sign({sellername:sellerObj.name},"secret",{expiresIn:100},(err,signedToken)=>{
                   if(err){
                       console.log(err)
                   }
                   else{
                       res.send({message:signedToken,sellername:sellerObj.name,status:"success"})
                   }
               })
              }
          })

        }
    })
    
})

//get req to get user by username
adminApiObj.get("/read/:name",(req,res)=>{
    //get collection
    let adminCollectionObj=req.app.get("adminCollectionObj")
    //get username from params
    let clientSellerName=req.params.name;
    
    //finding for  user
    adminCollectionObj.findOne({name:clientSellerName})
    .then(sellerCredentials=>{res.send({message:sellerCredentials})})
     .catch(err=>{console.log(err)})
})

//put req to update the profile data
adminApiObj.put("/update",(req,res)=>{
    //get collection
    let adminCollectionObj=req.app.get("adminCollectionObj")
    let updatedData=req.body;
    console.log(updatedData)
    adminCollectionObj.updateOne({email:updatedData.email},{$set:{name:updatedData.name,dob:updatedData.dob}})
    .then(()=>{
        adminCollectionObj.findOne({name:updatedData.name})
        .then(newProfile=>{
            res.send({message:"profile is updated",sellerCredentials:newProfile})
        console.log(newProfile)})
        .catch(err=>{console.log(err)})
    })
    .catch(err=>{console.log(err)})
})


//get req to get all users
adminApiObj.get("/admins",(req,res)=>{
    //get usercollectionobj
    let adminCollectionObj=req.app.get("adminCollectionObj")
    adminCollectionObj.find().toArray()
    .then(adminsArray=>{res.send({message:"success",admins:adminsArray})
})
    .catch(err=>res.send({message:"error"}))
})

//export this obj
module.exports=adminApiObj;