//create mini express
const exp=require("express")
const userApiObj=exp.Router();

//import bcrypt
const bcrypt=require("bcryptjs");
//import json webtoken
const token=require("jsonwebtoken")

//import tokenverification
const verifyToken=require("../token/tokenverification")

//body parsing middleware to get json data
userApiObj.use(exp.json());

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
userApiObj.post("/register",upload.single("profilepic"),(req,res)=>{
     //get  image cdn links from cloudinary
let profilepic=req.file.path;
console.log("profile",profilepic)
let purchaser=JSON.parse(req.body.purchaserData)
console.log("req body is",req.body.purchaserData)
console.log("purchaser is",purchaser)
purchaser.profilepic=profilepic;
const purchaserData=purchaser;
    //get data to register
    //let purchaserData=req.body;
    //get collection
    let userCollectionObj=req.app.get("userCollectionObj")
    //find for duplicate user
    userCollectionObj.findOne({name:purchaserData.name})
    .then(user=>{
        if(user==null){
            bcrypt.hash(purchaserData.password,6).then(hashedPassword=>{purchaserData.password=hashedPassword;
                userCollectionObj.insertOne(purchaserData)
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
userApiObj.post("/login",(req,res)=>{
    let purchaserData=req.body;
    console.log(purchaserData);
    //search user by username
    //get collection
   let userCollectionObj=req.app.get("userCollectionObj")
    userCollectionObj.findOne({name:purchaserData.name},(err,purchaserObj)=>{
        if(err){
            console.log(err)
        }
        else if(purchaserObj==null){
            //if username is not matched
            res.send({message:"Invalid name"})
        }
        else{
          //if username is matched then verify password using bcrypt
          bcrypt.compare(purchaserData.password,purchaserObj.password,(err,result)=>{
              if(err){
                  console.log(err)
              }
              else if(result==false){
                   res.send({message:"Invalid password"})
              }
              else{
                  //generate token as user is logged in successfully with correct credemtilaps
               token.sign({purchasername:purchaserObj.name},"secret",{expiresIn:100},(err,signedToken)=>{
                   if(err){
                       console.log(err)
                   }
                   else{
                       res.send({message:signedToken,purchasername:purchaserObj.name,status:"success"})
                   }
               })
              }
          })

        }
    })
    
})

//get req to get user by username
userApiObj.get("/read/:name",(req,res)=>{
    //get collection
    let userCollectionObj=req.app.get("userCollectionObj")
    //get username from params
    let clientPurchaserName=req.params.name;
    
    //finding for  user
    userCollectionObj.findOne({name:clientPurchaserName})
    .then(purchaserCredentials=>{res.send({message:purchaserCredentials})})
     .catch(err=>{console.log(err)})
})

//put req to update the profile data
userApiObj.put("/update",(req,res)=>{
    //get collection
    let userCollectionObj=req.app.get("userCollectionObj")
    let updatedData=req.body;
    console.log(updatedData)
    userCollectionObj.updateOne({email:updatedData.email},{$set:{name:updatedData.name,dob:updatedData.dob}})
    .then(()=>{
        userCollectionObj.findOne({name:updatedData.name})
        .then(newProfile=>{
            res.send({message:"profile is updated",purchaserCredentials:newProfile})
        console.log(newProfile)})
        .catch(err=>{console.log(err)})
    })
    .catch(err=>{console.log(err)})
})


//delete req to remove user 
userApiObj.delete("/delete/:name",(req,res)=>{
    //get collection
    let userCollectionObj=req.app.get("userCollectionObj")
    let Pusername=req.params.name;
    userCollectionObj.deleteOne({name:Pusername})
    .then(success=>{res.send({message:"user is deleted successfully",userCredentials:success})})
    .catch(err=>{console.log(err)})
}) 


//get req to get all users
userApiObj.get("/users",(req,res)=>{
    //get usercollectionobj
    let userCollectionObj=req.app.get("userCollectionObj")
    userCollectionObj.find().toArray()
    .then(usersArray=>res.send({message:"success",users:usersArray}))
    .catch(err=>res.send({message:"error"}))
})

//export this obj
module.exports=userApiObj;